import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center, Bounds } from '@react-three/drei';

const Model = () => {
    const { scene } = useGLTF('/iPhone15pro.glb');
    return <primitive object={scene} />;
};

useGLTF.preload('/iPhone15pro.glb');

export const IphoneModel = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <Environment preset="city" />

                <Suspense fallback={null}>
                    <Bounds fit clip observe margin={1.2}>
                        <Center>
                            <Model />
                        </Center>
                    </Bounds>
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={1.5}
                />
            </Canvas>
        </div>
    );
};