import { useSpring } from "@react-spring/three";
import {
  CubeCamera,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  PresentationControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAppSelector } from "hooks";
import { useEffect } from "react";
import * as THREE from "three";

const PLAYER_CAMERA = {
  position: {
    x: 0,
    y: 16,
    z: 30,
  },
  rotation: {
    x: -0.4,
  },
};

const MAP_CAMERA = {
  position: {
    x: 0,
    y: 300,
    z: 0,
  },
  rotation: {
    x: -Math.PI / 2,
  },
};

const vec = new THREE.Vector3();

export const Camera = ({
  playerPosition,
  ...props
}: {
  playerPosition: { x: number; y: number; z: number };
}) => {
  const camera = useThree((state) => state.camera);

  const cameraType = useAppSelector((state) => state.controls.cameraType);

  useFrame(() => {
    if (cameraType === "map") {
      camera.position.lerp(
        vec.set(
          MAP_CAMERA.position.x,
          MAP_CAMERA.position.y,
          MAP_CAMERA.position.z
        ),
        0.03
      );
      if (MAP_CAMERA.rotation.x !== camera.rotation.x) {
        camera.rotation.x = MAP_CAMERA.rotation.x;
      }
    }
    if (cameraType === "player") {
      camera.position.lerp(
        vec.set(
          playerPosition.x + PLAYER_CAMERA.position.x,
          playerPosition.y + PLAYER_CAMERA.position.y,
          playerPosition.z + PLAYER_CAMERA.position.z
        ),
        0.03
      );
      if (PLAYER_CAMERA.rotation.x !== camera.rotation.x) {
        camera.rotation.x = PLAYER_CAMERA.rotation.x;
      }
    }
  });

  return (
    <PerspectiveCamera
      {...props}
      makeDefault
      position={[0, 16, 30]}
      rotation={[-0.4, 0, 0]}
    />
  );
};
