import type { IBooksVolume } from "#shared/interfaces/IBooksVolume";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  const bookId = getRouterParam(event, "bookId");

  return $fetch<IBooksVolume>(`${config.public.apiBaseUrl}/volumes/${bookId}`, {
    method: "GET",
    params: {
      key: apiKey,
    },
  });
});
