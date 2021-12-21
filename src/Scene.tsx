import { Canvas } from "@react-three/fiber"
import { OrbitControls, useProgress, Html } from "@react-three/drei"
import Model from "./Model"
import { Suspense } from "react"
import Light from "./Light"

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
    <Canvas camera={{ position: [-10, 40, 60] }}>
      <hemisphereLight intensity={0.4} />
      <directionalLight intensity={0.4} position={[0, 40, 0]} />
      <OrbitControls />
      <Light />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </Canvas>
  )
}

export default Scene
