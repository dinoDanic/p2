import { useFrame } from "@react-three/fiber";
import {
  InstancedRigidBodyApi,
  RigidBody,
  RigidBodyApi,
} from "@react-three/rapier";
import { useInput } from "hooks";
import React, { useRef } from "react";
import * as THREE from 'three'

export const Player = () => {
  const player = useRef<RigidBodyApi>(null);
  const mesh = useRef();
  const { forward, backward, right } = useInput();

  useFrame((state, delta) => {
    const currentPosition = player.current?.translation();
    const currentRotation = player.current?.rotation();
    console.log('curr rot', currentRotation)
    const SPEED = delta * 2;
    if (forward) {
      if (right) {
        const eulerRotation = new THREE.Euler(0, 1, 0 )
        const qurot = new THREE.Quaternion()
        qurot.setFromEuler(eulerRotation)
        player.current?.setNextKinematicRotation(qurot)
      }
      player.current?.setNextKinematicTranslation({
        x: currentPosition.x + SPEED,
        y: currentPosition.y,
        z: currentPosition.z,
      });
    }
    if (backward) {
      player.current?.setNextKinematicTranslation({
        x: currentPosition.x - SPEED,
        y: currentPosition.y,
        z: currentPosition.z,
      });
    }
  });

  return (
    <RigidBody ref={player} type={"kinematicPosition"} friction={0}>
      <mesh castShadow>
        <capsuleGeometry args={[0.2, 0.5]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
    </RigidBody>
  );
};
