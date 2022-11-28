import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types";
import * as THREE from "three";
import { useAppSelector, useInput } from "hooks";
import { PlayerAnimationTypes } from "./types";
import { directionOffset } from "./helpers";

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();
const rotateQuartenion = new THREE.Quaternion();
const rotateAngle = new THREE.Vector3(0, 1, 0);

export const PhysicsPlayer = () => {
  const model = useGLTF("./models/player.glb");
  const cameraType = useAppSelector((state) => state.controls.cameraType);
  const { scene, animations } = model;
  const { actions } = useAnimations(animations, scene);
  const currentAction = useRef("");

  const ref = useRef<RigidBodyApi>(null);
  const rapier = useRapier();
  const { camera } = useThree();
  const { forward, backward, left, right, jump, shift } = useInput();

  useFrame((state, delta) => {
    if (!ref.current) return;
    const velocity = ref.current.linvel();
    // update camera
    const currentTranslation = ref.current.translation();
    camera.position.set(
      currentTranslation.x,
      currentTranslation.y + 10,
      currentTranslation.z + 10
    );
    camera.rotation.x = -0.5;
    // update axe
    // movement
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    // jumping
    const world = rapier.world.raw();
    const ray = world.castRay(
      new RAPIER.Ray(ref.current?.translation(), { x: 0, y: -1, z: 0 })
    );

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
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });
  });

  useEffect(() => {
    model.scene.children.forEach((mesh) => {
      mesh.children.forEach((c) => {
        c.receiveShadow = false;
      });
    });
  }, []);

  useEffect(() => {
    let action: PlayerAnimationTypes = "idle";

    if (cameraType === "map") return;

    if (forward || backward || left || right) {
      action = "walk";
      if (jump) {
        action = "jump";
      }
      if (shift) {
        action = "run";
        if (jump) {
          action = "jumprun";
        }
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

  return (
    <>
      <ambientLight />
      <RigidBody
        ref={ref}
        type={"dynamic"}
        colliders={false}
        mass={1}
        position={[0,10,0]}
        enabledRotations={[false, false, false]}
      >
        {/* <OrbitControls /> */}
        <CapsuleCollider args={[0.75, 0.5]} position={[0,0.9,0]} />
        <primitive object={scene} />
      </RigidBody>
    </>
  );
};
