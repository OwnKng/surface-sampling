// @ts-nocheck
import { useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler"

const tempObject = new THREE.Object3D()
const tempPosition = new THREE.Vector3()

const Cube = ({ colorArray }: any) => {
  const meshRef = useRef()

  const cube = useMemo(
    () =>
      new THREE.Mesh(
        new THREE.IcosahedronGeometry(10, 2),
        new THREE.MeshBasicMaterial()
      ),
    []
  )

  const sampler = useMemo(() => new MeshSurfaceSampler(cube).build(), [cube])

  useLayoutEffect(() => {
    for (let i = 0; i < 500; i++) {
      sampler.sample(tempPosition)
      tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z)
      tempObject.scale.setScalar(Math.random() * 0.5 + 0.5)
      tempObject.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      tempObject.updateMatrix()
      meshRef.current.setMatrixAt(i, tempObject.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, 500]}>
      <boxGeometry args={[0.5, 0.5, 0.5]}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        />
      </boxGeometry>
      <meshPhongMaterial vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}

const tempColor = new THREE.Color()

const data = Array.from({ length: 500 }, () => ({
  color: ["#5ADBFF", "#006DAA", "#F15152", "#ffffff"][
    Math.floor(Math.random() * 5)
  ],
  scale: 1,
}))

export default function CubeWrapper() {
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(500)
          .fill(0)
          .flatMap((_, i) => tempColor.set(data[i].color).toArray())
      ),
    []
  )

  return <Cube colorArray={colorArray} />
}
