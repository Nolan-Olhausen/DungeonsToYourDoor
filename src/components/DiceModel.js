import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useCompoundBody } from "@react-three/cannon";
import { Vector3, EdgesGeometry, LineSegments, LineBasicMaterial } from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";

export default function DiceModel({ position = [0, 2, 0], onRoll }) {
  const diceRef = useRef();
  const { scene } = useGLTF("/models/dice_d20.glb");

  // Prepare physics shape data
  let shapes = [];
  let canRender = false;

  const diceMesh = scene.getObjectByName("D20_d20_0");
  if (diceMesh && diceMesh.geometry) {
    const geometry = diceMesh.geometry;
    const positionAttr = geometry.attributes.position;
    const vertices = [];
    for (let i = 0; i < positionAttr.count; i++) {
      vertices.push([
        positionAttr.getX(i),
        positionAttr.getY(i),
        positionAttr.getZ(i),
      ]);
    }

    const convexGeom = new ConvexGeometry(
      vertices.map((v) => new Vector3(...v))
    );

    const faces = [];
    const index = convexGeom.index;
    if (index) {
      for (let i = 0; i < index.count; i += 3) {
        faces.push([index.getX(i), index.getX(i + 1), index.getX(i + 2)]);
      }
    }

    shapes = [
      {
        type: "ConvexPolyhedron",
        args: [vertices, faces],
      },
    ];
    canRender = true;

    // Add edge outlines after geometry is loaded and dice mesh is ready
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      // Create edges geometry
      const edgesGeom = new EdgesGeometry(geometry);
      // Create line segments with black thin line material
      const edgesMaterial = new LineBasicMaterial({ color: 0x131411, linewidth: 1 });
      const edgesMesh = new LineSegments(edgesGeom, edgesMaterial);

      diceMesh.add(edgesMesh);

      // Cleanup on unmount
      return () => {
        diceMesh.remove(edgesMesh);
        edgesGeom.dispose();
        edgesMaterial.dispose();
      };
    }, [diceMesh, geometry]);
  }

  const [ref, api] = useCompoundBody(
    () => ({
      mass: 1,
      position,
      shapes,
    }),
    diceRef
  );

  const rollDice = () => {
    const lateralForce = 20 + Math.random() * 4; // 8–12 units/s
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

    if (onRoll) onRoll();
  };

  if (!canRender) {
    console.warn("Could not find dice mesh or geometry to build physics shape");
    return null;
  }

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={50}
      onClick={rollDice}
      castShadow
      receiveShadow
    />
  );
}
