import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/feature/productSlice"
import { logout } from "../store/feature/authSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const confirmation = confirm("Are you sure want to logout?");
    if (confirmation) {
      dispatch(logout())
      localStorage.removeItem('access_token')
      localStorage.removeItem('username')
      localStorage.removeItem('cart')
      localStorage.removeItem('stocks')
      window.location.href = "/login"
    }
  }

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="container mx-auto pt-14 flex flex-col">
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout;