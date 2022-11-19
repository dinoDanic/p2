import {
  ContactShadows,
  OrbitControls,
  Shadow,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAppSelector, useInput } from "hooks";
import { useEffect, useRef } from "react";
import { directionOffset, lightIntensity } from "./helpers";
import { PlayerAnimationTypes } from "./types";
import * as THREE from "three";
import { Camera } from "features/controls";

const walkDirection = new THREE.Vector3();
const rotateAngle = new THREE.Vector3(0, 1, 0);
const rotateQuartenion = new THREE.Quaternion();
const cameraTarget = new THREE.Vector3();

export const Player = () => {
  const model = useGLTF("./models/player.glb");
  const { animations, scene } = model;
  const { actions } = useAnimations(animations, scene);
  const cameraType = useAppSelector((state) => state.controls.cameraType);
  const { forward, backward, left, right, shift, jump } = useInput();

  const currentAction = useRef("");
  const pointLight = useRef();
  const controlsRef = useRef<typeof OrbitControls | null>(null);
  const camera = useThree((state) => state.camera);

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;

    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y;
    cameraTarget.z = model.scene.position.z;
    if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };

  useFrame((state, delta) => {
    if (cameraType !== "player") return;

    if (
      currentAction.current === "run" ||
      currentAction.current === "walk"
      // currentAction.current === "jump"
    ) {
      // calculate towards camera direction
      const angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );

      // diagnoal movement angle offset
      const newDirectionOffSet = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      // rotate model
      rotateQuartenion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + newDirectionOffSet
      );
      model.scene.quaternion.rotateTowards(rotateQuartenion, 0.2);

      // calcutaer diration
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffSet);

      const velocity = shift ? 7 : 1.7;

      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;

      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      // updateCameraTarget(moveX, moveZ);
    }

    const currentIntensity = pointLight.current.intensity;

    pointLight.current.intensity = lightIntensity({
      currentIntensity,
      delta,
      min: 1,
      max: 1.8,
    });
  });

  useEffect(() => {
    let action: PlayerAnimationTypes = "idle";

    if (cameraType === "map") return;
    if (forward || backward || left || right) {
      action = "walk";
      if (shift) {
        action = "run";
      }
      if (jump) {
        action = "jump";
      }
    } else if (jump) {
      action = "jump";
    } else {
      action = "idle";
    }

    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right, shift, jump]);

  useEffect(() => {
    model.scene.children.forEach((mesh) => {
      mesh.children.forEach((c) => {
        c.receiveShadow = false;
      });
    });
  }, []);

  return (
    <group>
      <mesh>
        <Camera ref={controlsRef} playerPosition={model.scene.position} />
        <primitive object={scene}>
          <pointLight
            ref={pointLight}
            intensity={1.8}
            distance={15}
            color={"orange"}
            position={[0.5, 2.5, -0.9]}
            castShadow
          />
        </primitive>
      </mesh>
    </group>
  );
};
