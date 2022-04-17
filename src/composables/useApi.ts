import { reactive } from "vue";

import type {
  ApiState,
  UseApi,
  ApiFetchData,
  ApiError,
} from "./useApi.interface";

export * from "./useApi.interface";

const defaultState = () => ({
  data: null,
  loading: false,
  error: null,
});

export default function useApi<DataType>(): UseApi<DataType> {
  const apiState: ApiState<DataType> = reactive(defaultState());

  const fetchData: ApiFetchData<DataType> = async (
    request: Promise<DataType>
  ): Promise<void> => {
    apiState.loading = true;
    try {
      const response: DataType = await request;
      apiState.data = response;
    } catch (e) {
      apiState.error = e as ApiError;
    }
    apiState.loading = false;
  };

  const clearData = () => {
    Object.assign(apiState, defaultState());
  };

  return {
    apiState,
    fetchData,
    clearData,
  };
}
