import { Canvas } from "@react-three/fiber"
import { OrbitControls, useProgress, Html } from "@react-three/drei"
import Model from "./Model"
import { Suspense } from "react"
import Light from "./Light"
import Lights from "./Lights"

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

const Scene = () => (
  <Canvas camera={{ position: [-10, 50, 60] }}>
    <Lights />
    <Light />
    <OrbitControls />
    <Suspense fallback={<Loader />}>
      <Model />
    </Suspense>
  </Canvas>
)

export default Scene
