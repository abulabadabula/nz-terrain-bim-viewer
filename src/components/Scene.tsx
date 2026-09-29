import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Terrain from './Terrain';
import Parcel from './Parcel';
import Annotations from './Annotations';
import CameraController from './CameraController';
import BimModelLoader from './BimModelLoader';

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 100, 200], fov: 50 }} shadows>
      <ambientLight intensity={0.4} />
      <directionalLight position={[100, 100, 50]} intensity={1} castShadow />
      <OrbitControls enableDamping dampingFactor={0.05} />
      <Environment preset="sunset" />
      
      <CameraController />
      <Terrain />
      <Parcel />
      <Annotations />
      <BimModelLoader />
    </Canvas>
  );
}