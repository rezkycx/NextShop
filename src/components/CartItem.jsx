import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decrementQtyCart, incrementQtyCart, overMaxStockStatus, removeItemCart } from "../store/feature/authSlice";
import { useEffect, useState } from "react";

const CartItem = ({product, cart}) => {
  const [isOverOfStock, setIsOverOfStock] = useState(cart.isOverMax || false);
  const dispatch = useDispatch();
  const {stocks} = useSelector(state => state.product);
  const productStock = stocks.find(item => item.id === cart.id).stock;

  useEffect(() => {
    if (cart.qty > productStock) {
      if (!cart.isOverMax && !isOverOfStock) {
        dispatch(overMaxStockStatus({id: cart.id, status: true}));
        setIsOverOfStock(true);
      }
    } else {
      if (isOverOfStock && cart.isOverMax) {
        setIsOverOfStock(false);
        dispatch(overMaxStockStatus({id: cart.id, status: false}))
      }
    }
  }, [cart.qty])

  const subTotalPrice = (price, qty) => {
    return "$ " + (price * qty).toFixed(2);
  }

  const handleDecrementQty = (payload) => {
    dispatch(decrementQtyCart(payload));
  }
  
  const handleIncrementQty = (payload) => {
    dispatch(incrementQtyCart(payload));
  }

  const handleRemoveCart = (id) => {
    const confirmation = confirm("Are you sure want to remove this product?");
    if (confirmation) {
      dispatch(removeItemCart(id));
    }
  }

  return (
    <div
      className="bg-blue-100 p-4 rounded flex gap-x-3 shadow w-full max-w-2xl"
      style={{ minWidth: "580px" }}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-28 h-28 object-cover shrink-0"
      />
      <div className="desc flex flex-col flex-1">
        <Link
          to={`/products/${product.id}`}
          className="font-medium text-lg w-fit"
        >
          {product.title.length > 50
            ? [...product.title].slice(0, 50).join("") + "..."
            : product.title}
        </Link>
        <div className="flex py-3">
          <button className="px-4 text-lg bg-purple-300 font-bold rounded-lg shadow shadow-purple-400" onClick={() => handleDecrementQty(cart)} disabled={cart.qty === 1 ? true : false}>
            -
          </button>
          <span className="mx-3 text-lg font-semibold">{cart.qty}</span>
          <button className=" px-4 text-lg bg-purple-300 font-bold rounded-lg shadow shadow-purple-400" onClick={() => handleIncrementQty(cart)} >
            +
          </button>
          <span className="font-bold text-xl ml-auto">{subTotalPrice(product.price, cart.qty)}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-red-500 text-sm">{isOverOfStock && "*Quantity exceeds available stock"}</p>
          <button className="px-4 py-1 text-sm bg-red-500 rounded-full self-end text-white shadow shadow-red-800" onClick={() => handleRemoveCart(cart.id)}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
