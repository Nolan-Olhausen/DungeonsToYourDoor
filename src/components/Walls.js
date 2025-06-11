import React from "react";
import { usePlane } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";

const Wall = ({ rotation, position }) => {
  const [ref] = usePlane(() => ({
    rotation,
    position,
    restitution: 0.5,
    friction: 0.3,
  }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
};

export default function Walls() {
  const { size, camera } = useThree();
  const { zoom } = camera;

  // Orthographic camera bounds at z=0
  const width = size.width / zoom / 2;
  const height = size.height / zoom / 2;
  const wallOffset = 3.75; // Buffer to avoid clipping at edges

  return (
    <>
      {/* Left wall */}
      <Wall
        rotation={[0, Math.PI / 2, 0]}
        position={[-width / 2 + 1, 0, 0]}
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
