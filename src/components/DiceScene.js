import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Physics, usePlane, useConvexPolyhedron } from "@react-three/cannon";
import DiceModel from "./DiceModel";
import Walls from "./Walls";

const Plane = ({
  rotation = [-Math.PI / 2, 0, 0],
  position = [0, 0, 0],
  color = "transparent",
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
        camera={{ position: [0, 0, 16], fov: 50 }}
        onCreated={(state) => {
          state.camera.lookAt(0, 0, 0);
        }}
      >
        <ambientLight intensity={3} />

        <Physics gravity={[0, 0, -9.81]}>
          {/* Floor */}
          <Plane
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />

          {/* Walls */}
          <Walls />

          {/* Dice */}
          <DiceModel position={[2, 0, 2]} rotation={[0, Math.PI / 2, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
}
