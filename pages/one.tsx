import { ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Experience } from '../src/components/Experience/Experience'

const one = () => {
  return (
    <Canvas style={{ width: "100%", height: "100vh" }} eventPrefix="offset">
      <color args={["#695b5b"]} attach="background" />
      <ScrollControls pages={10}>
        <Experience />
      </ScrollControls>
    </Canvas>
  )
}

export default one
