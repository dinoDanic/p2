import { Canvas } from "@react-three/fiber";
import { Ground, Player } from "features/physics";
import React from "react";
import { Debug, Physics } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";

const PhysicsPage = () => {
  return (
    <>
      <Canvas shadows style={{ width: "100%", height: "100vh" }}>
        <OrbitControls />
        <spotLight position={[3,3,0]} intensity={0.4} distance={10}/>
        <Physics>
          <Debug />
          <Player />
          <Ground />
        </Physics>
      </Canvas>
    </>
  );
};

export default PhysicsPage;
