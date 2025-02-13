import { defineStore } from "pinia";
import { ref, computed } from "vue";

import type { IProductDetail } from "./../types/product";

interface BasketItem {
  product: IProductDetail;
  quantity: number;
}

const basketStore = "BASKET_STORE";

export const useBasketStore = defineStore(basketStore, () => {
  const products = ref<IProductDetail[]>([]);
  const basket = ref<BasketItem[]>([]);

  const addToBasket = (payload: {
    detail: IProductDetail;
    quantity?: number;
  }) => {
    const basketItem = basket.value.find(
      (item) => item.product.id === payload.detail.id
    );
    const qty = payload.quantity || 1;

    if (basketItem) {
      basketItem.quantity = qty;
    } else {
      basket.value.push({ product: payload.detail, quantity: qty });
      products.value.push(payload.detail);
    }
  };

  const updateBasketQuantity = (payload: {
    detail: IProductDetail;
    qty: number;
  }) => {
    const basketItem = basket.value.find(
      (item) => item.product.id === payload.detail.id
    );
    if (!basketItem) return;

    const newQty = basketItem.quantity + payload.qty;
    const hasStock = basketItem.product.quantity >= newQty;

    if (newQty > 0 && hasStock) {
      basketItem.quantity = newQty;
    }
  };

  const removeBasketItem = (payload: { detail: IProductDetail }) => {
    basket.value = basket.value.filter(
      (item) => item.product.id !== payload.detail.id
    );
  };

  const setInitialBasket = (payload: BasketItem[]) => {
    basket.value = payload;
  };

  const basketItems = computed(() => basket.value);

  const basketTotalAmount = computed(() =>
    basket.value.reduce(
      (total, cart) => total + cart.product.price * cart.quantity,
      0
    )
  );

  return {
    products,
    basket,
    addToBasket,
    updateBasketQuantity,
    removeBasketItem,
    setInitialBasket,
    basketItems,
    basketTotalAmount,
  };
});
