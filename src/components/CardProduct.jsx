import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleAddToCart } from "../services/helper";

const Header = ({image, title, productStock}) => {
  return (
    <div className="mb-2 relative">
      <div className="absolute inset-x-0 inset-y-1/2">
        {productStock === 0 && <p className="bg-slate-200 text-center text-red-600 text-lg font-bold bg-opacity-50">Out of Stock</p>}
      </div>
      <img src={image} alt={title} className="h-56 w-full object-cover rounded-t-md border-b"/>
    </div>
  )
}

const Body = (props) => {
  const {title, category, price, description} = props;
  return (
    <div className="px-3 mb-2">
      <h2 className="text-xl mb-1 font-bold text-slate-900 tracking-tighter">
        {(title.length > 25) ? `${title.substring(0,25)}...` : title}
      </h2>
      <button className={`px-2 py-1 text-white border rounded mb-1 text-sm cursor-default font-thin bg-blue-950 opacity-95 shadow shadow-blue outline-none`}>
        {category}
      </button>
      <p className="mb-1">
      {(description.length > 100) ? `${description.substring(0,100)}...` : description}
      </p>
      <p className="text-xl font-bold">
        ${" "}{price}
      </p>
    </div>
  )
}

const CardProduct = ({product}) => {
  const {isLogin} = useSelector(state => state.auth);
  const {stocks} = useSelector(state => state.product);
  const navigate = useNavigate();
  const productStock = stocks.find(item => item.id === product.id).stock;

  return (
    <div className="card w-full max-w-xs rounded-lg bg-stone-100 border shadow-md">
      <Header image={product.image} title={product.title} productStock={productStock} />
      <Body 
        title={product.title}
        category={product.category}
        description={product.description}
        price={product.price}
      />
      <div className="footer flex gap-x-3 px-3 mb-3">
        <Link className="py-2 px-4 bg-blue-800 text-white rounded hover:bg-blue-900 font-medium" to={`/products/${product.id}`}>Details</Link>
        <button 
          className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
          onClick={() => isLogin ? handleAddToCart({id: product.id}) : navigate("/login")}
          disabled={productStock === 0 ? true : false}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default CardProduct;