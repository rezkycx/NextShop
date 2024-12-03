import store from "../store/store";
import { addToCart } from "../store/feature/authSlice";

export const handleAddToCart = (payload) => {
  store.dispatch(addToCart(payload));
}