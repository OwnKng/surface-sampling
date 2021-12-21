import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { PointLight } from "three"

const Light = () => {
  const ref = useRef<PointLight>(null!)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    ref.current.position.x = Math.sin(time * 3) * Math.PI * 2 * 3
    ref.current.position.z = 20 + Math.cos(time * 3) * Math.PI * 2 * 3
    ref.current.position.y = (Math.sin(time * 3) * 0.5 + 0.5) * 30
  })

  return <pointLight ref={ref} intensity={4.0} decay={1} distance={20} />
}

export default Light
