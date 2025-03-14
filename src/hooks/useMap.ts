import { getGeocode } from '@_api/map';
import { TGeocode } from '@_types/map.type';
import { useQuery } from '@tanstack/react-query';

export const useGetGeocode = (address: string) => {
  return useQuery<TGeocode, Error>({
    queryKey: ['geocode', address],
    queryFn: () => getGeocode(address),
    enabled: !!address,
  });
};
