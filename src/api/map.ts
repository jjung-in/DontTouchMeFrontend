import { TGeocode } from '@_types/map.type';
import { instance } from './instance';

export const getGeocode = async (address: string): Promise<TGeocode> => {
  const { data } = await instance.get('map/geocode', { params: { address } });
  return data;
};
