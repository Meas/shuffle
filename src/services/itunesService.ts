import type { AxiosError } from "axios";
import http from "./instance";

import type { ItunesItem } from "./itunesService.interface";

export * from "./itunesService.interface";

export async function getData(term: string): Promise<ItunesItem[]> {
  const params = { term };

  return http
    .get("search", { params })
    .then((res) => res.data.results)
    .catch((e: Error | AxiosError) =>
      // TODO: create handleError function to create appropriate object
      Promise.reject(e)
    );
}
