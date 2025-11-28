import type { IBooksVolumeList } from "#shared/interfaces/IBooksVolumeList";
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  const query: IBooksSearchFilter & { size: number; page: number } =
    getQuery(event);

  const size = config.public.apiPageSize as number;

  if (!query.searchString) {
    throw new Error("no query string.");
  }

  return $fetch<IBooksVolumeList>(`${config.public.apiBaseUrl}/volumes`, {
    method: "GET",
    params: {
      q: query.searchString,
      maxResults: size,
      startIndex: size * query.page,
      key: apiKey,
    },
  });
});
