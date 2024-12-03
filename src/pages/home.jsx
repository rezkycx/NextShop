import Products from "../components/Products"
import HeaderSection from "../components/HeaderSection";
import DataError from "../components/DataError";
import { useSelector } from "react-redux";


const HomePage = () => {
  const {isLoading, products, error} = useSelector(state => state.product);
  return (
    <>
      <HeaderSection>Products:</HeaderSection>
      <section>
        {(isLoading) && <h1 className="text-center mt-10 text-xl font-bold text-slate-600">Loading...</h1>}
        {(error) && <DataError message={error} />}
        {products.length > 0 && 
          <Products products={products} />
        }
      </section>
    </>
  )
}

export default HomePage;