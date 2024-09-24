import { defineStore } from "pinia";
import { ref, computed } from "vue";
import products from "../data/products.json";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

export const useCartStore = defineStore("cart", () => {
  const productsData = ref<Product[]>(products.data);
  const cart = ref<CartItem[]>([]);

  const addToCart = (payload: { id: number; quantity?: number }) => {
    const product = productsData.value.find((item) => item.id === payload.id);
    if (!product) return;

    const cartItem = cart.value.find((item) => item.id === payload.id);
    const qty = payload.quantity || 1;

    if (cartItem) {
      cartItem.quantity = qty;
    } else {
      cart.value.push({ ...product, quantity: qty });
    }
    product.stock--;
  };

  const updateCartQuantity = (payload: { product: CartItem; qty: number }) => {
    const cartItem = cart.value.find((item) => item.id === payload.product.id);
    if (!cartItem) return;

    const newQty = cartItem.quantity + payload.qty;
    const hasStock = cartItem.stock >= newQty;

    if (newQty > 0 && hasStock) {
      cartItem.quantity = newQty;
    }
  };

  const removeCartItem = (payload: { id: number }) => {
    cart.value = cart.value.filter((item) => item.id !== payload.id);
  };

  const setInitialCart = (payload: CartItem[]) => {
    cart.value = payload;
  };

  const cartItems = computed(() => cart.value);

  const cartTotalAmount = computed(() =>
    cart.value.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  return {
    productsData,
    cart,
    addToCart,
    updateCartQuantity,
    removeCartItem,
    setInitialCart,
    cartItems,
    cartTotalAmount,
  };
});
