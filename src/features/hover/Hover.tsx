import React, { useState } from "react";
import { Sparkles, useGLTF, Html, Box, Plane } from "@react-three/drei";
import { useAppSelector } from "hooks";

export const Hover = () => {
  const [hover, setHover] = useState(false);
  const cameraType = useAppSelector((s) => s.controls.cameraType);
  if (cameraType !== "map") return null;
  return (
    <>
      <Plane
        onPointerOver={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[30, -1, 40]}
        args={[10, 10]}
      >
        <meshStandardMaterial attach="material" color="white" />
      </Plane>
      {hover && (
        <Html position={[30, 4, 40]}>
          <h1 style={{ color: "white" }}>hover</h1>
        </Html>
      )}
    </>
  );
};
