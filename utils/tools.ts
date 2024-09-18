export const getImageUrl = (url: string | undefined) => {
  if (!url) return "";
  const config = useRuntimeConfig();
  const baseImageUrl = config.public.imageUrl;
  return `${baseImageUrl}${url}`;
};
