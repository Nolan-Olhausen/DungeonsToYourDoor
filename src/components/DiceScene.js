import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import { Physics, usePlane, useConvexPolyhedron } from "@react-three/cannon";
import { Vector3, EdgesGeometry, LineSegments, LineBasicMaterial } from "three";
import DiceModel from "./DiceModel";
import Walls from "./Walls";

const createIcosahedronUVs = (geometry) => {
  const uvs = [];
  const positions = geometry.attributes.position.array;

  // Icosahedron has 20 faces, each with 3 vertices
  for (let i = 0; i < positions.length; i += 9) {
    // For each triangle face, create UV coordinates that map to a triangle in texture space
    uvs.push(0.5, 1); // Bottom center
    uvs.push(0, 0); // Bottom left
    uvs.push(1, 0); // Bottom right
  }

  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  return geometry;
};

const createFaceTexture = (text) => {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (!context) return null;

  // Background color
  context.fillStyle = "#3F6C51";
  context.fillRect(0, 0, size, size);

  // Text styling
  context.fillStyle = "#FFFFFF";
  context.font = "bold 100px Arial";
  context.textAlign = "center";
  context.textBaseline = "alphabetic"; // Baseline helps for accurate measurement

  // Measure text height
  const metrics = context.measureText(text);
  const actualHeight =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  // Compute vertical center position
  const y = size / 2 + actualHeight - metrics.actualBoundingBoxDescent;

  // Draw text centered
  context.fillText(text, size / 2, y);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const D20 = (props) => {
  const radius = 2;
  const meshRef = useRef();
  const rawGeometry = new THREE.IcosahedronGeometry(radius);
  const geometry = createIcosahedronUVs(rawGeometry.toNonIndexed());

  // Add material groups to geometry (CRITICAL STEP)
  const verticesPerFace = 3;
  const sides = 20;
  for (let i = 0; i < sides; i++) {
    geometry.addGroup(i * verticesPerFace, verticesPerFace, i);
  }

  // Rest of your physics setup remains the same
  const positionAttr = geometry.attributes.position;
  const vertices = [];
  for (let i = 0; i < positionAttr.count; i++) {
    vertices.push([
      positionAttr.getX(i),
      positionAttr.getY(i),
      positionAttr.getZ(i),
    ]);
  }

  const faces = [];
  for (let i = 0; i < positionAttr.count; i += 3) {
    faces.push([i, i + 1, i + 2]);
  }

  const [ref, api] = useConvexPolyhedron(() => ({
    mass: 1,
    args: [vertices, faces],
    ...props,
  }));

  useEffect(() => {
    if (ref.current) {
      const verticesPerFace = 3;
      const sides = 20;
      for (let i = 0; i < sides; i++) {
        ref.current.geometry.addGroup(i * verticesPerFace, verticesPerFace, i);
      }
    }
  }, [ref]);

  useEffect(() => {
    if (!meshRef.current) return;

    const edgeGeom = new EdgesGeometry(geometry);
    const edgeMat = new LineBasicMaterial({
      color: 0x131411,
      depthTest: true,
      depthWrite: true,
      toneMapped: false,
    });
    const edgeLines = new LineSegments(edgeGeom, edgeMat);

    meshRef.current.add(edgeLines);

    return () => {
      meshRef.current.remove(edgeLines);
      edgeGeom.dispose();
      edgeMat.dispose();
    };
  }, [geometry]);

  const materials = Array.from({ length: 20 }, (_, i) => {
    const texture = createFaceTexture((i + 1).toString());
    return <meshBasicMaterial key={i} attach={`material-${i}`} map={texture} />;
  });

  const rollDice = () => {
    const lateralForce = 8 + Math.random() * 4; // 8–12 units/s
    const upwardForce = 6 + Math.random() * 2; // 6–8 units/s
    const directionAngle = Math.random() * 2 * Math.PI; // 360°
    const vx = Math.cos(directionAngle) * lateralForce;
    const vy = Math.sin(directionAngle) * lateralForce;
    const vz = upwardForce;

    api.velocity.set(vx, vy, vz);

    const spinStrength = 15;
    api.angularVelocity.set(
      (Math.random() - 0.5) * spinStrength,
      (Math.random() - 0.5) * spinStrength,
      (Math.random() - 0.5) * spinStrength
    );
  };

  return (
    <mesh
      ref={(el) => {
        meshRef.current = el;
        ref.current = el;
      }}
      onClick={rollDice}
      castShadow
      scale={0.75}
      receiveShadow
      geometry={geometry}
    >
      {materials}
    </mesh>
  );
};

const Plane = ({
  rotation = [-Math.PI / 2, 0, 0],
  position = [0, 0, 0],
  color = "#fff",
}) => {
  const [ref] = usePlane(() => ({ position, rotation }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshPhongMaterial color={color} transparent opacity={0} />
    </mesh>
  );
};

export default function DiceDesktopScene() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        shadows
        orthographic
        camera={{
          zoom: 50,
          position: [0, 0, 16],
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={3} />

        <Physics gravity={[0, 0, -9.81]}>
          {/* Floor */}
          <Plane position={[0, 0, 0]} rotation={[0, 0, 0]} />

          {/* Walls */}
          <Walls />

          {/* Dice */}
          {/* <DiceModel position={[0, 0, 3]} rotation={[0, 0, 0]} /> */}
          <D20 position={[0, 0, 3]} rotation={[0, 0, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
}
