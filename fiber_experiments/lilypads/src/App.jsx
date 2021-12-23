import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Box from './comps/Box.jsx'
import Lily from './comps/Lily.jsx'


export default function App() {
    const deg2rad = degrees => degrees * (Math.PI / 180);

    return (
	<div className="w-screen h-screen border-0 border-red-400">
	    <Canvas>
		<Suspense fallback={null}>
		    <Lily />
		</Suspense>
		<ambientLight intensity={0.5} />
		<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
		<pointLight position={[-10, -10, -10]} />
		<Box position={[-1.2, 0, 0]} />
		<Box position={[1.2, 0, 0]} />
	    </Canvas>
	</div>
    )
}
