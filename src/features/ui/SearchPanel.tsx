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
    <div className="flex gap-2 bg-gray-800/90 backdrop-blur p-3 rounded-lg shadow-xl border border-gray-700">
      <input 
        type="text"
        placeholder="输入新西兰地址 (如: Queen St, Auckland)..." 
        value={inputVal} 
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        onClick={handleSearch} 
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium disabled:opacity-50 transition-colors"
      >
        {isLoading ? '定位中...' : '定位'}
      </button>
    </div>
  );
}