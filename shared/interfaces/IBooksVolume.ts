import type { IBooksVolumeImageLinks } from "./IBooksVolumeImageLinks";

export interface IBooksVolume {
  id: string;
  volumeInfo: {
    title?: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    printedPageCount?: number;
    language?: string;
    description?: string;
    imageLinks?: IBooksVolumeImageLinks;
  };
}
