import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const LinkItem = (props) => {
  const {to="#", children, classname, handleClick = () => {}} = props;
  return (
    <Link
      to={to} 
      className={`text-blue-800 sm:text-white font-medium px-4 py-2 rounded-md ${classname}`}
      onClick={handleClick}
      >
      {children}
    </Link>
  )
}

const Navbar = ({handleLogout}) => {
  const {isLogin, username, cart} = useSelector(state => state.auth)
  const [isOpen, setIsopen] = useState(false);
  const {pathname} = useLocation();
  
  function calculateCartLength() {
    const totalQtyCart = cart.reduce((acc, current) => acc + current.qty, 0);
    return totalQtyCart;
  }

  const activeNav = "border-2 border-blue-500 sm:bg-blue-950 sm:border-0";

  const toggleMenu = () => {
    setIsopen(!isOpen);
  }

  const classNavlink = ["sm:hover:bg-blue-950", "hover:border", "hover:border-blue-500", "sm:hover:border-0", "mx-2"].join(" ");

  
  return (
    <nav className="h-14 bg-blue-900 py-2 shadow shadow-black fixed inset-0 z-30">
      <div className="container px-5 mx-auto flex items-center justify-between sm:justify-start sm:gap-x-5">
        <h1 name="brand" className="text-2xl font-bold leading-9 drop-shadow-md hover:drop-shadow-2xl text-white">
          <Link to="/" onClick={() => setIsopen(false)}>NextShop</Link>
        </h1>
        <div className={`fixed z-30 top-14 inset-x-0 bottom-0 flex-col gap-y-2 bg-stone-50 sm:static sm:flex sm:flex-row sm:justify-start sm:bg-transparent sm:text-white sm:gap-y-0 justify-center items-center ${isOpen ? "flex" : "hidden"} sm:flex-1`}>
          <LinkItem to="/" classname={(pathname === "/" || /\/products\/[0-9]/.test(pathname)) ? activeNav : classNavlink} handleClick={() => setIsopen(false)}>Home</LinkItem>
          { isLogin ? (
            <>
              <LinkItem to="/cart" classname={(pathname === "/cart") ? activeNav : classNavlink} handleClick={() => setIsopen(false)}>Cart: <span className="bg-red-500 px-2 tex-center w-2 h-2 rounded text-slate-100">{calculateCartLength()}</span></LinkItem>
              <LinkItem classname="cursor-default sm:ml-auto">{username}</LinkItem>
              <LinkItem classname={classNavlink} handleClick={() => handleLogout()}>Logout</LinkItem>
            </>) : (
            <>
              <LinkItem to="/login" classname={classNavlink}>
                Login
              </LinkItem>
            </>
            )
          }
        </div>
        {/* burger and close icon */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="relative w-10 h-10 focus:outline-none flex flex-col justify-center items-end">
            <div className={`block w-8 h-1 bg-white rounded-full transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`block w-8 h-1 bg-white rounded-full my-1 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`block w-8 h-1 bg-white rounded-full transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;