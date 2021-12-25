import React, { useRef, Fragment, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Box from './comps/Box.jsx'
import Lily from './comps/Lily.jsx'
import Controls from './comps/Controls.jsx'
import { MeshWobbleMaterial } from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, Scanline, Grid, DotScreen, SelectiveBloom } from '@react-three/postprocessing'
//import { BlendFunction } from 'postprocessing'
import { BlurPass, Resizer, KernelSize } from 'postprocessing'
/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'


document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
   });

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
    const [activeMark, setActiveMark] = useState("")
    const [open, setOpen] = useState(false)
    const [linkFunc, setLinkFunc] = useState(null)
    const [linkVal, setLinkVal] = useState("")
    const cancelButtonRef = useRef(null)
    const alref = useRef(null)
    const slref = useRef(null)
    const plref = useRef(null)
    const lilyref = useRef(null)

    return (
	<div className="w-screen h-screen border-0 border-red-400">

	    <div className="absolute z-30 p-5 text-base font-bold text-white pl-9">
		{activeMark}
	    </div>

	    <Transition.Root show={open} as={Fragment}>
		<Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
		    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
			<Transition.Child
			    as={Fragment}
			    enter="ease-out duration-300"
			    enterFrom="opacity-0"
			    enterTo="opacity-100"
			    leave="ease-in duration-200"
			    leaveFrom="opacity-100"
			    leaveTo="opacity-0"
			>
			    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
			</Transition.Child>

			{/* This element is to trick the browser into centering the modal contents. */}
			<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
			    &#8203;
			</span>
			<Transition.Child
			    as={Fragment}
			    enter="ease-out duration-300"
			    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			    enterTo="opacity-100 translate-y-0 sm:scale-100"
			    leave="ease-in duration-200"
			    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
			    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			>
			    <div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				<div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
				    <div className="sm:flex sm:items-start">
					<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
					    {/*<ExclamationIcon className="w-6 h-6 text-red-600" aria-hidden="true" />*/}
					    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					    </svg>

					</div>
					<div className="w-full mt-3 mr-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
					    <Dialog.Title as="h3" className="text-lg font-medium text-gray-900 select-none leading-6">
						set bookmark link
					    </Dialog.Title>
					    <div className="w-full mt-2">
						<div class="mb-3 pt-0 w-full">
						    <input
							type="text"
							placeholder="bookmark link"
							value={linkVal[0]}
							onChange={(e) => setLinkVal([e.target.value, linkVal[1]])}
							class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full border-0 border-red-400"
						    />
						</div>
					    </div>
					</div>
				    </div>
				</div>
				<div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
				    <button
					type="button"
					className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-400 border border-transparent select-none rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200 sm:ml-3 sm:w-auto sm:text-sm"
					onClick={() => {
					    linkFunc(linkVal)
					    setOpen(false)
					}}
				    >
					save
				    </button>
				    <button
					type="button"
					className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 select-none rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
					onClick={() => setOpen(false)}
					ref={cancelButtonRef}
				    >
					cancel
				    </button>
				</div>
			    </div>
			</Transition.Child>
		    </div>
		</Dialog>
	    </Transition.Root>

	    <Canvas
		camera={{ position: [1.4, 1.8, 0.3], rotation: [-1.1, -0.1, -0.1]}} controls={false}
	    >
		<Suspense fallback={null}>
		    <Lily lref={lilyref} waterRef={water_ref} setActiveMark={setActiveMark} setLinkFunc={setLinkFunc} setLinkVal={setLinkVal} setOpen={setOpen}/>
		    {/*<Controls />*/}
		</Suspense>
		<Plane ref={water_ref} />
		<ambientLight ref={alref} intensity={0.5} />
		<spotLight  ref={slref} position={[10, 10, 10]} angle={0.15} penumbra={1} />
		<pointLight  ref={plref} position={[-10, -10, -10]} />
		{/*<Box position={[-1.2, 0, 0]} />
		<Box position={[1.2, 0, 0]} />*/}
		<EffectComposer>
		    {/*<DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />*/}
		    {/*<Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} height={300} />*/}

		    {/*{lilyref.current? <SelectiveBloom
			lights={[alref, slref, plref]} // ⚠️ REQUIRED! all relevant lights
			selection={[lilyref]} // selection of objects that will have bloom effect
			selectionLayer={10} // selection layer
			intensity={12} // The bloom intensity.
			blurPass={undefined} // A blur pass.
			width={Resizer.AUTO_SIZE} // render width
			height={Resizer.AUTO_SIZE} // render height
			kernelSize={KernelSize.LARGE} // blur kernel size
			luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
			luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
		    /> : "" }*/}
		    {/*<Bloom
			intensity={0} // The bloom intensity.
			blurPass={undefined} // A blur pass.
			width={Resizer.AUTO_SIZE}  //render width
			height={Resizer.AUTO_SIZE} // render height
			kernelSize={KernelSize.LARGE}//  blur kernel size
			luminanceThreshold={0.9}//  luminance threshold. Raise this value to mask out darker elements in the scene.
			luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
		    />*/}
		    <Noise opacity={0.09} />
		    {/*<Vignette eskil={false} offset={0.1} darkness={1.1} />*/}
		</EffectComposer>
	    </Canvas>
	</div>
    )
}






