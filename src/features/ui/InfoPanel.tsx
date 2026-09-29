import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedCorner, toggleAnnotations } from '../gis/gisSlice';

export default function InfoPanel() {
  const dispatch = useAppDispatch();
  const { wgs84Coord, area, showAnnotations, parcelGeoJson } = useAppSelector((state) => state.gis);
  const selectedCorner = useAppSelector((state) => state.gis.selectedCornerId);
  
  // 模拟角点数据
  const corners = [
    { id: 'CP1', label: '西北角', height: '45.2m' },
    { id: 'CP2', label: '东北角', height: '46.1m' },
    { id: 'CP3', label: '东南角', height: '44.8m' },
    { id: 'CP4', label: '西南角', height: '45.5m' },
  ];

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto bg-gray-900 border-l border-gray-800">
      <h2 className="text-xl font-bold text-blue-400">地块信息面板</h2>
      
      <div className="bg-gray-800 p-4 rounded-lg space-y-3">
        <h3 className="font-semibold text-gray-300">基础数据</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-gray-400">面积:</span>
          <span className="font-mono text-white">{area ? (area / 10000).toFixed(3) + ' 公顷' : '-'}</span>
          <span className="text-gray-400">WGS84:</span>
          <span className="font-mono text-xs text-white">
            {wgs84Coord ? `${wgs84Coord[1].toFixed(5)}, ${wgs84Coord[0].toFixed(5)}` : '-'}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <span className="text-sm text-gray-300">显示 3D 标注</span>
          <button 
            onClick={() => dispatch(toggleAnnotations())}
            className={`w-10 h-5 rounded-full transition-colors ${showAnnotations ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${showAnnotations ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg space-y-3">
        <h3 className="font-semibold text-gray-300">角点与高程</h3>
        <div className="space-y-2">
          {corners.map((corner) => (
            <div 
              key={corner.id}
              className={`p-3 rounded cursor-pointer transition-all border ${
                selectedCorner === corner.id 
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg' 
                  : 'bg-gray-900 border-gray-700 hover:bg-gray-700 text-gray-300'
              }`}
              onClick={() => dispatch(setSelectedCorner(corner.id))}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{corner.id} ({corner.label})</span>
                <span className="text-xs opacity-80">高程: {corner.height}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}