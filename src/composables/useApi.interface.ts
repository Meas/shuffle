export interface ApiData {
  id: number;
}

export interface ApiError {
  message: string;
}

export interface ApiFetchData<T> {
  (arg: Promise<T>): Promise<void>;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export interface UseApi<T> {
  apiState: ApiState<T>;
  fetchData: ApiFetchData<T>;
  clearData(): void;
}
