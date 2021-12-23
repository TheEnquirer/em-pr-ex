import ReactDOM from 'react-dom'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

function Box(props) {
    const deg2rad = degrees => degrees * (Math.PI / 180);
    useThree(({camera}) => {
	//camera.rotation.set(deg2rad(63), 0, deg2rad(46));
	//camera.lookAt
    })

    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
	<mesh
	    {...props}
	    ref={ref}
	    scale={clicked ? 1.5 : 1}
	    onClick={(event) => click(!clicked)}
	    onPointerOver={(event) => hover(true)}
	    onPointerOut={(event) => hover(false)}>
	    <boxGeometry args={[1, 1, 1]} />
	    <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
	</mesh>
    )
}

export default Box
