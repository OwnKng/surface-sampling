// @ts-nocheck
import React, { useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/monkey.glb")
  const { actions } = useAnimations(animations, group)

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
      />
    </group>
  )
}

useGLTF.preload("/monkey.glb")
