import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";
import * as three from "three";

export const Land2 = () => {
  const model = useGLTF("./models/deadForest.glb");
  const { animations, scene } = model;

  console.log(model);

  useEffect(() => {
    const scale = 1;
    scene.scale.x = scale;
    scene.scale.y = scale;
    scene.scale.z = scale;
    scene.position.y = -0.2
    model.scene.castShadow = true

    model.scene.children.forEach((mesh) => {
        // mesh.castShadow = true;
      mesh.children.forEach((c) => {
        c.castShadow = true;
      });
    });
  }, []);

  return <primitive object={scene} />;
};
