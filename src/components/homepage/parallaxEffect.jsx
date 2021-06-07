import React from 'react'
import { useSpring, animated } from 'react-spring'
import '../../styles/parallaxStyle/parallaxStyle.css';

export default function ParallaxEffect({search}) {
    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 15, tension: 550, friction: 140 } }))
    const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
    const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
    const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`
    const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
    const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`
    return (
      <>
      <div className="containerParallax" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
        <animated.div className="card1" style={{ transform: props.xy.to(trans1) }} />
        <animated.div className="card2" style={{ transform: props.xy.to(trans2) }} />
        <animated.div className="card3" style={{ transform: props.xy.to(trans1) }} />
        <animated.div className="card4" style={{ transform: props.xy.to(trans4) }} /> 
        <animated.div className="card5" style={{ transform: props.xy.to(trans2) }} />
        <animated.div className="card6" style={{ transform: props.xy.to(trans3) }} />
        <animated.div className="card7" style={{ transform: props.xy.to(trans3) }} />
      </div>
      </>
    )
}
