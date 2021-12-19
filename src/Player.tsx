//@ts-nocheck
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const Player = () => {
  const ref = useRef()

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2

    ref.current.position.set(x, y, 50)
  })

  return <pointLight ref={ref} intensity={1.0} />
}

export default Player
