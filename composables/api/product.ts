export const useProduct = () => {
  const { $api } = useNuxtApp();

  const getProducts = async () => {
    const res = await $api(`/products`);
    return res;
  };

  return {
    getProducts,
  };
};
