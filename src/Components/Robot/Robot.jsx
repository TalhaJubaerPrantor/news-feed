import React, {
  useRef,
  useMemo,
  useEffect,
  useState
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

/* ------------------ Robot model with keyboard movement ------------------ */
function Robot2Model(props) {
  const group = useRef()
  const { scene, animations } = useGLTF('./models/robot2.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions, names } = useAnimations(animations, group)

  // Track key presses
  const [keys, setKeys] = useState({})

  // Play default animation
  useEffect(() => {
    const clipName = names[0]
    if (clipName && actions[clipName]) {
      actions[clipName].reset().fadeIn(0.5).play()
    }
    return () => actions[names[0]]?.fadeOut(0.5)
  }, [actions, names])

  // Keyboard listeners
  useEffect(() => {
    const down = (e) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: true }))
    const up = (e) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false }))
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  // Movement per frame
  useFrame((_, delta) => {
    const speed = 2 * delta // movement speed
    if (!group.current) return
    const g = group.current
    // Forward / Backward
    if (keys.w || keys.arrowup) g.position.z += speed
    if (keys.s || keys.arrowdown) g.position.z -= speed
    // Left / Right
    if (keys.a || keys.arrowleft) g.position.x -= speed
    if (keys.d || keys.arrowright) g.position.x += speed
    // Optional rotation (Q/E)
    if (keys.q) g.rotation.y -= 1 * delta
    if (keys.e) g.rotation.y += 1 * delta
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload('./models/robot2.glb')

/* ------------------ Full page Canvas wrapper ------------------ */
export default function Robot2Scene() {
  return (
    <Canvas className='robot-canvas' style={{ height: "50vh", width: "100%" }} camera={{ position: [0, 0, 2] }}>
      <ambientLight intensity={0.7} />
      <OrbitControls />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* Start robot at origin; move with W/A/S/D or Arrow keys */}
      <Robot2Model position={[0, -1, 0]} />
    </Canvas>
  )
}
