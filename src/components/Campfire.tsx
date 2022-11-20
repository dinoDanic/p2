import { Sparkles, useGLTF,  Box, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { lightIntensity } from "features/player/helpers";
import React, { FC, useRef, useState } from "react";

interface Props {
    position: [number, number, number]
  }

export const Campfire: FC<Props> = ({position}) => {
  const model = useGLTF("./models/campfire.glb");
  const pointLight = useRef();
  const { scene } = model;

  useFrame((state, delta) => {
    const currentIntensity = pointLight.current.intensity;
    pointLight.current.intensity = lightIntensity({
      currentIntensity,
      delta,
      min: 1.2,
      max: 10,
    });
  });
  return (
    <>
      <mesh position={position} scale={0.7}>
        <pointLight
          ref={pointLight}
          intensity={1.2}
          distance={20}
          color={"orange"}
          castShadow
        />
        <Sparkles
          position={[0, -4, 0]}
          size={20}
          color={"orange"}
          speed={5}
          count={10}
        />
      </mesh>
    </>
  );
};
