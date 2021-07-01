import useSWR from 'swr';
import { PlaceholderAPI } from '@/external-api/PlaceholderAPI';
import { fetcher } from '@/utils/Utils';
import { ApiResponseModel } from '@/interfaces/ApiResponse.model';
import { UserModel } from '@/interfaces/User.model';

export function useUser(id: number): ApiResponseModel<UserModel> {
  const { data, error } = useSWR(id ? PlaceholderAPI.user(id) : null, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
  };
}
