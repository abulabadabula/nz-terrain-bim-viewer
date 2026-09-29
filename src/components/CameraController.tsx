import { useFrame, useThree } from '@react-three/fiber';
import { useAppSelector } from '../app/hooks';
import * as THREE from 'three';
import { useRef } from 'react';

export default function CameraController() {
  const { camera } = useThree();
  const selectedCorner = useAppSelector((state) => state.gis.selectedCornerId);
  
  const targetPosition = useRef(new THREE.Vector3(0, 100, 200));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const cornerPositions: Record<string, THREE.Vector3> = {
    'CP1': new THREE.Vector3(-20, 5, -20),
    'CP2': new THREE.Vector3(20, 5, -20),
    'CP3': new THREE.Vector3(20, 5, 20),
    'CP4': new THREE.Vector3(-20, 5, 20),
  };

  useFrame((state, delta) => {
    if (selectedCorner && cornerPositions[selectedCorner]) {
      const targetPos = cornerPositions[selectedCorner];
      targetPosition.current.set(targetPos.x + 30, targetPos.y + 40, targetPos.z + 30);
      targetLookAt.current.copy(targetPos);
    }

    camera.position.lerp(targetPosition.current, delta * 2);
    currentLookAt.current.lerp(targetLookAt.current, delta * 2);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}