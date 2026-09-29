import proj4 from 'proj4';

proj4.defs("EPSG:2193", "+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 +x_0=1600000 +y_0=10000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

export const wgs84ToNztm = (lng: number, lat: number): [number, number] => {
  return proj4('EPSG:4326', 'EPSG:2193', [lng, lat]) as [number, number];
};

export const nztmToWgs84 = (x: number, y: number): [number, number] => {
  return proj4('EPSG:2193', 'EPSG:4326', [x, y]) as [number, number];
};