import React from "react";
import { usePlane } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";

const Wall = ({ rotation, position }) => {
  const [ref] = usePlane(() => ({
    rotation,
    position,
  }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
};

export default function Walls() {
  const { camera, viewport } = useThree();
  const aspect = viewport.aspect;
  const distance = camera.position.z;

  // Approximate visible half-width and half-height at z=0
  const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * distance;
  const width = height * aspect;

  const wallOffset = -1.5; // slight offset to prevent clipping

  return (
    <>
      {/* Left wall */}
      <Wall
        rotation={[0, Math.PI / 2, 0]}
        position={[-width / 2 - wallOffset, 0, 0]}
      />
      {/* Right wall */}
      <Wall
        rotation={[0, -Math.PI / 2, 0]}
        position={[width / 2 + wallOffset, 0, 0]}
      />
      {/* Front wall */}
      <Wall
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, height / 2 + wallOffset, 0]}
      />
      {/* Back wall */}
      <Wall
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -height / 2 - wallOffset, 0]}
      />
    </>
  );
}
