import { useProgress, Html } from "@react-three/drei"
import { animated, useSpring } from "react-spring"

const Loader = () => {
  const { progress } = useProgress()

  const spring = useSpring({ from: { width: 0 }, to: { width: progress } })

  return (
    <Html center>
      <div className='loader'>
        <span>Loading</span>
        <div className='bars'>
          <div className='bar' />
          <animated.div
            className='bar'
            style={{
              background: "white",
              ...spring,
            }}
          />
        </div>
      </div>
    </Html>
  )
}

export default Loader
