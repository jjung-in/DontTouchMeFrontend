import { getGeocode } from '@_api/map';
import { TGeocodeResponse } from '@_types/map.type';
import { useQuery } from '@tanstack/react-query';

export const useGetGeocode = (address: string) => {
  return useQuery<TGeocodeResponse, Error>({
    queryKey: ['geocode', address],
    queryFn: () => getGeocode(address),
    enabled: !!address,
  });
};
