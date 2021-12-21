//@ts-nocheck
import { useHelper } from "@react-three/drei"
import { useRef } from "react"
import { SpotLightHelper } from "three"

const Lights = () => {
  const ref = useRef()
  useHelper(ref, SpotLightHelper, "hotpink")
  return (
    <>
      <spotLight position={[20, -20, 80]} angle={10} intensity={1} />
      <spotLight position={[-20, -20, 80]} angle={10} intensity={0.8} />
      <hemisphereLight intensity={0.1} />
      <directionalLight intensity={0.1} position={[0, 80, 0]} />
    </>
  )
}

export default Lights
