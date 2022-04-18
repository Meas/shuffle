import type { AxiosError } from "axios";
import http from "./instance";

import type { ItunesItem } from "./itunesService.interface";

export * from "./itunesService.interface";

export async function getData(term: string): Promise<ItunesItem[]> {
  // For some odd reason, if we add entity=album to our request we avoid cors issue
  // that happens for certain term strings
  const params = { term, entity: "album" };

  return http
    .get("search", { params })
    .then((res) => res.data.results)
    .catch((e: Error | AxiosError) =>
      // TODO: create handleError function to create appropriate object
      Promise.reject(e)
    );
}
