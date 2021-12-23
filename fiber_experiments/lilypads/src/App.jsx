import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Box from './comps/Box.jsx'
import Lily from './comps/Lily.jsx'
import Controls from './comps/Controls.jsx'


const Plane = () => {
    return (
	<mesh rotation-x={Math.PI * -0.5}>
	    <planeBufferGeometry args={[40, 40]} />
	    <meshStandardMaterial color={"lightBlue"} />
	</mesh>
    )
}

export default function App() {

    return (
	<div className="w-screen h-screen border-0 border-red-400">
	    <Canvas>
		<Suspense fallback={null}>
		    <Lily />
		</Suspense>
		<Plane />
		<ambientLight intensity={0.5} />
		<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
		<pointLight position={[-10, -10, -10]} />
		<Box position={[-1.2, 0, 0]} />
		<Box position={[1.2, 0, 0]} />
		<Controls />
	    </Canvas>
	</div>
    )
}
