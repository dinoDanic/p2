import { RigidBody } from "@react-three/rapier";
import React from "react";

export const Ground = () => {
  return (
    <RigidBody type={"fixed"} >
      <mesh rotation={[Math.PI * 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <boxGeometry args={[10, 1, 10]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
    </RigidBody>
  );
};
