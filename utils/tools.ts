export const getImageUrl = (url: string) => {
  const config = useRuntimeConfig();
  const baseImageUrl = config.public.imageUrl;
  return `${baseImageUrl}${url}`;
};
