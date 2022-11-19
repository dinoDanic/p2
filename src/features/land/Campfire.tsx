import { Sparkles, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { lightIntensity } from "features/player/helpers";
import React, { useRef } from "react";

export const Campfire = () => {
  const model = useGLTF("./models/campfire.glb");
  const pointLight = useRef();
  const { scene } = model;

  useFrame((state, delta) => {
    const currentIntensity = pointLight.current.intensity;
    pointLight.current.intensity = lightIntensity({
      currentIntensity,
      delta,
      min: 1.2,
      max: 3,
    });
  });
  return (
    <primitive object={scene} position={[30, 0.35, 40]} scale={0.7}>
      <pointLight
        ref={pointLight}
        position={[0, 3, 0]}
        intensity={0.2}
        distance={10}
        color={"orange"}
      />
      <Sparkles
        position={[0, 1, 0]}
        size={10}
        color={"red"}
        speed={5}
        count={10}
      />
    </primitive>
  );
};
