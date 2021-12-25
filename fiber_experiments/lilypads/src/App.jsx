import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Box from './comps/Box.jsx'
import Lily from './comps/Lily.jsx'
import Controls from './comps/Controls.jsx'
import { MeshWobbleMaterial } from '@react-three/drei'

document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
   });

const Plane = () => {
    return (
	<mesh rotation-x={Math.PI * -0.5} position={[0, -0.1, 0]} >
	    <planeBufferGeometry args={[40, 40]} />
	    <meshStandardMaterial color={"lightBlue"} />
	    {/*<MeshWobbleMaterial factor={0.01} speed={10} color={"lightBlue"} />*/}
	</mesh>
    )
}

export default function App() {
    const [activeMark, setActiveMark] = useState("")

    return (
	<div className="w-screen h-screen border-0 border-red-400">

	    <div className="absolute z-30 p-5 text-base font-bold text-white pl-9">
		{activeMark}
	    </div>

	    <Canvas
		camera={{ position: [1.4, 1.8, 0.3], rotation: [-1.1, -0.1, -0.1]}} controls={false}
	    >
		<Suspense fallback={null}>
		    <Lily setActiveMark={setActiveMark}/>
		    {/*<Controls />*/}
		</Suspense>
		<Plane />
		<ambientLight intensity={0.5} />
		<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
		<pointLight position={[-10, -10, -10]} />
		{/*<Box position={[-1.2, 0, 0]} />
		<Box position={[1.2, 0, 0]} />*/}
	    </Canvas>
	</div>
    )
}






