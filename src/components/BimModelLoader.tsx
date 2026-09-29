import { useRef, useEffect } from 'react';
import { useStore } from 'react-redux';
import * as THREE from 'three';
import { type RootState } from '../app/store'

export default function BimModelLoader() {
  const store = useStore<RootState>();
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const { transformMatrix } = state.bim;

      if (groupRef.current) {
        const matrix = new THREE.Matrix4().fromArray(transformMatrix);
        // groupRef.current.applyMatrix4(matrix); // 实际加载 IFC 后应用
      }
    });
    return () => unsubscribe();
  }, [store]);

  return (
    <group ref={groupRef}>
      {/* 未来 IFC 模型将在此处渲染 */}
    </group>
  );
}