import type { IBooksVolumeList } from "#shared/interfaces/IBooksVolumeList";
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  const query: IBooksSearchFilter = getQuery(event);

  return $fetch<IBooksVolumeList>(`${config.public.apiBaseUrl}/volumes`, {
    method: "GET",
    params: {
      q: query.searchString,
      key: apiKey,
    },
  });
});
