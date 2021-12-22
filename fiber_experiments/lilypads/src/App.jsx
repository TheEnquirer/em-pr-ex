import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'

function App() {
    return (
	<div id="canvas-container">
	    whee
	    <Canvas>
		<mesh>
		    <sphereGeometry
		    />
		    <meshStandardMaterial />
		</mesh>
		<ambientLight intensity={0.1} />
		<directionalLight color="red" position={[0, 0, 5]} />
	    </Canvas>
	</div>
    )
}

export default App;
