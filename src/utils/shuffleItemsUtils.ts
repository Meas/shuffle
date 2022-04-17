import type { ShuffleItem } from "@/models/shuffleItem.interface";
import type { ItunesItem } from "@/services/itunesService";

export const getDefaultValues = (): ShuffleItem[] => {
  return [
    {
      id: 1,
      value: "A",
    },
    {
      id: 2,
      value: "B",
    },
    {
      id: 3,
      value: "C",
    },
    {
      id: 4,
      value: "D",
    },
    {
      id: 5,
      value: "E",
    },
  ];
};

export const handleCollectionSort = (data: ItunesItem[]) => {
  return data
    ?.sort((a, b) => (a.collectionName > b.collectionName ? 1 : -1))
    .slice(0, 5)
    .map((item) => {
      return { id: item.collectionId, value: item.collectionName };
    });
};
