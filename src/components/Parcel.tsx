import { useRef, useEffect } from 'react';
import { useStore } from 'react-redux';
import * as THREE from 'three';
import { RootState } from '../app/store';

export default function Parcel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const store = useStore<RootState>();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const geojson = state.gis.parcelGeoJson;
      
      if (geojson && meshRef.current) {
        // 实际开发中：解析 GeoJSON -> THREE.Shape -> ExtrudeGeometry
        // 此处用缩放动画模拟地块加载
        meshRef.current.scale.set(1, 1, 1);
      }
    });
    return () => unsubscribe();
  }, [store]);

  return (
    <mesh ref={meshRef} position={[0, 2, 0]} castShadow receiveShadow scale={[0,0,0]}>
      <boxGeometry args={[40, 4, 40]} />
      <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} wireframe={false} />
    </mesh>
  );
}