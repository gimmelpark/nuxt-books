export default defineEventHandler(async (event) => {
  const { code } = event.context.params as { code: string };

  const languagesData = (await useStorage("assets:server").get(
    "ISO-639-1-language-codes.json",
  )) as Record<string, string>;

  return languagesData[code];
});
