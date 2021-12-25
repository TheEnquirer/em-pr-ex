import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Box from './comps/Box.jsx'
import Lily from './comps/Lily.jsx'
import Controls from './comps/Controls.jsx'
import { MeshWobbleMaterial } from '@react-three/drei'


const Plane = React.forwardRef((_, ref) => {
    return (
	<mesh ref={ref} rotation-x={Math.PI * -0.5} position={[0, -0.1, 0]} >
	    <planeBufferGeometry args={[40, 40]} />
	    <meshStandardMaterial color={"lightBlue"} />
	    {/*<MeshWobbleMaterial factor={0.01} speed={10} color={"lightBlue"} />*/}
	</mesh>
    )
});

export default function App() {
    let water_ref = useRef(null);

    return (
	<div className="w-screen h-screen border-0 border-red-400">

	    <div className="absolute z-30 p-5 text-lg font-bold text-white pl-9">
		upper text
	    </div>

	    <Canvas
		camera={{ position: [1.4, 1.8, 0.3], rotation: [-1.1, -0.1, -0.1]}} controls={false}
	    >
		<Suspense fallback={null}>
		    <Lily waterRef={water_ref} />
		    {/*<Controls />*/}
		</Suspense>
		<Plane ref={water_ref} />
		<ambientLight intensity={0.5} />
		<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
		<pointLight position={[-10, -10, -10]} />
		{/*<Box position={[-1.2, 0, 0]} />
		<Box position={[1.2, 0, 0]} />*/}
	    </Canvas>
	</div>
    )
}






