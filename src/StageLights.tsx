const StageLights = () => (
  <>
    <spotLight position={[20, -20, 80]} angle={10} intensity={0.5} />
    <spotLight position={[-20, -20, 80]} angle={10} intensity={0.5} />
    <hemisphereLight intensity={0.1} />
    <directionalLight intensity={0.1} position={[0, 80, 0]} />
  </>
)

export default StageLights
