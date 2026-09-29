import { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppSelector } from '../app/hooks';

export default function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const heightmapUrl = useAppSelector((state) => state.gis.terrainHeightmap);
  
  // 使用默认高度图，实际项目中从 Redux 获取
  const heightmap = useLoader(THREE.TextureLoader, heightmapUrl || 'https://threejs.org/examples/textures/terrain/grasslight-big.jpg'); 

  useEffect(() => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const positionAttribute = geometry.getAttribute('position');
    
    // 模拟高程数据注入 (实际应读取高度图 R 通道)
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      // 简单的正弦波模拟地形起伏
      const elevation = Math.sin(x * 0.05) * 5 + Math.cos(y * 0.05) * 5; 
      positionAttribute.setZ(i, elevation);
    }
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  }, []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[500, 500, 128, 128]} />
      <meshStandardMaterial color="#4ade80" roughness={0.9} />
    </mesh>
  );
}