import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useGeocodeAddressMutation } from '../gis/linzApi';
import { setCoords, setAddress } from '../gis/gisSlice';
import { wgs84ToNztm } from '../gis/utils';

export default function SearchPanel() {
  const [inputVal, setInputVal] = useState('');
  const [geocode, { isLoading }] = useGeocodeAddressMutation();
  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    if (!inputVal) return;
    dispatch(setAddress(inputVal));
    try {
      const result = await geocode(inputVal).unwrap();
      const nztm = wgs84ToNztm(result.lng, result.lat);
      dispatch(setCoords({ wgs84: [result.lng, result.lat], nztm }));
    } catch (error) {
      console.error('Geocoding failed', error);
    }
  };

  return (
    // 移除了 shadow-xl 和 backdrop-blur，将 w-72 改为 w-full
    <div className="flex gap-2 bg-gray-800 p-3 rounded-lg border border-gray-700">
      <input 
        type="text"
        placeholder="输入新西兰地址..." 
        value={inputVal} 
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <button 
        onClick={handleSearch} 
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium disabled:opacity-50 transition-colors text-sm whitespace-nowrap"
      >
        {isLoading ? '定位中...' : '定位'}
      </button>
    </div>
  );
}