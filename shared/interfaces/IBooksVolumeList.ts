import type { IBooksVolume } from "./IBooksVolume";

export interface IBooksVolumeList {
  kind: string;
  totalItems: number;
  items: IBooksVolume[];
}
