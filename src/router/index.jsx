import { createBrowserRouter, redirect } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import HomePage from '../pages/home.jsx'
import LoginPage from '../pages/login.jsx'
import CartPage from '../pages/cart.jsx';
import DetailproductPage from '../pages/detailProduct.jsx';
import ErrorPage from '../pages/error.jsx';
import store from "../store/store.js"



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "products/:id",
        element: <DetailproductPage />
      },
      {
        path: "cart",
        element: <CartPage />,
        loader: () => {
          if (!store.getState().auth.isLogin) {
            return redirect("/login")
          } 
          return null
        }
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (store.getState().auth.isLogin) {
        return redirect("/")
      }
      return null
    }
  }
]);

export default router;