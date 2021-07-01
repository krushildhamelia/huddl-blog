export interface ApiResponseModel<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}
