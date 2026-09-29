import { Html } from '@react-three/drei';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedCorner } from '../features/gis/gisSlice';

export default function Annotations() {
  const dispatch = useAppDispatch();
  const showAnnotations = useAppSelector((state) => state.gis.showAnnotations);
  const selectedCorner = useAppSelector((state) => state.gis.selectedCornerId);

  const corners = [
    { id: 'CP1', position: [-20, 5, -20] as [number, number, number] },
    { id: 'CP2', position: [20, 5, -20] as [number, number, number] },
    { id: 'CP3', position: [20, 5, 20] as [number, number, number] },
    { id: 'CP4', position: [-20, 5, 20] as [number, number, number] },
  ];

  if (!showAnnotations) return null;

  return (
    <>
      {corners.map((corner) => (
        <Html key={corner.id} position={corner.position} center distanceFactor={50}>
          <div 
            className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shadow-lg border ${
              selectedCorner === corner.id 
                ? 'bg-red-500 text-white border-red-300 scale-125' 
                : 'bg-white text-gray-800 border-gray-200 hover:bg-blue-100'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setSelectedCorner(corner.id));
            }}
          >
            {corner.id}
          </div>
        </Html>
      ))}
    </>
  );
}