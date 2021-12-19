// @ts-nocheck
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useProgress, Html } from "@react-three/drei"
import Model from "./Model"
import { Suspense } from "react"
import Player from "./Player"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className='loader'>
        <span>Loading</span>
        <div className='bars'>
          <div className='bar' />
          <div
            className='bar'
            style={{
              width: `${progress}%`,
              background: "#5ADBFF",
            }}
          />
        </div>
      </div>
    </Html>
  )
}

const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [-10, 50, 50] }}>
      <hemisphereLight intensity={0.2} />
      <directionalLight castShadow intensity={0.8} position={[0, 40, 0]} />
      <OrbitControls />
      <Suspense fallback={<Loader />}>
        <Model />
        <Player />
      </Suspense>
    </Canvas>
  )
}

export default Scene
