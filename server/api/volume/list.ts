import type { IBooksVolumeList } from "#shared/interfaces/IBooksVolumeList";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  return $fetch<IBooksVolumeList>(`${config.public.apiBaseUrl}/volumes`, {
    method: "GET",
    params: {
      q: "test",
      key: apiKey,
    },
  });
});
