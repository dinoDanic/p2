import {
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  Html,
  useGLTF,
  useScroll,
  OrbitControls,
  OrthographicCamera,
  Scroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

const Test = () => (
  <div
    style={{
      width: "1025px",
      height: "695px",
      background: "red",
      borderRadius: "16px",
    }}
  >
    lol
  </div>
);

export const Experience = () => {
  const computer = useGLTF("./model.gltf");
  const parentRef = useRef();
  const htmlRef = useRef();
  const areaLightRef = useRef();
  const scroll = useScroll();
  const defaulRotationY = 0.4;
  const defaulPositionY = -1.2;
  const defaultRotationMonitor = Math.PI;

  computer.nodes.Top.rotation.x = defaultRotationMonitor;
  computer.nodes.Top.position.x = 0;
  computer.nodes.Top.position.z = -10.412353515625 - 0.15;
  computer.nodes.Scene.position.x = 0;

  useFrame(({ mouse }, delta) => {
    const b = scroll.range(0, 1 / 8);
    const f = scroll.visible(1 / 8, 1 / 8);

    computer.nodes.Top.rotation.x = defaultRotationMonitor - b * 1.65;
    computer.nodes.Scene.position.z = b * 3;
    computer.nodes.Scene.position.y = defaulPositionY - b / 2;
    computer.nodes.Scene.position.x = -b / 4;

    computer.nodes.Scene.rotation.y = defaulRotationY - b / 2;

    if (f) {
      areaLightRef.current.intensity = 50;
    } else areaLightRef.current.intensity = 0;
  });


  return (
    <mesh ref={parentRef}>
      <Environment preset={"city"} />
      {/* <OrbitControls /> */}
      <PresentationControls
        // global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.2, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 200 }}
        snap={{ mass: 4, tension: 200 }}
      >
        {/* <Float */}
        {/*   rotationIntensity={1} */}
        {/*   floatIntensity={1} */}
        {/* > */}
        <primitive
          object={computer.scene}
          // position-y={defaulPositionY}
          rotation-y={defaulRotationY}
        >
          <rectAreaLight
            ref={areaLightRef}
            width={2.5}
            height={1.65}
            intensity={0}
            color={"white"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
            <Html
              transform
              center
              fullscreen
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
              prepend
            >
              <Test />
            </Html>
        </primitive>
        {/* </Float> */}
      </PresentationControls>
      <ContactShadows position-y={-1.8} opacity={0.4} scale={5} blur={2.4} />
    </mesh>
  );
};
