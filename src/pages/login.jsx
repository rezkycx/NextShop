import InputForm from "../components/InputForm";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/feature/authSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {isLoading, error} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser({
      username: event.target.username.value, 
      password: event.target.password.value, 
    })).then((res) => !res.error ? navigate("/") : null)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-neutral-50">
      <div className="w-full max-w-xs">
        {isLoading && <h1 className="text-slate-700 text-center font-medium">Processing ...</h1>}
        <h1 className="text-3xl font-bold mb-2 text-blue-900 text-center">ShopEase Login</h1>
        <p className="font-medium text-slate-600 mb-2 text-center">Welcome, Please enter you details</p>
        <img src="/images/login-ilustrate.svg" alt="login ilustration" className="max-w-60 block mx-auto mb-2" />
        {error && <h1 className="text-red-700 my-2 text-center">*{error}</h1>}
        <form onSubmit={handleLogin} method="post">
          <InputForm
            label="Username"
            type="text"
            name="username"
            placeholder="your name"
          />
          <InputForm
            label="Password"
            type="password"
            name="password"
            placeholder="******"
          />
          <button 
            type="submit" 
            className="h-10 w-full px-6 font-semibold rounded-md text-white bg-blue-900 hover:bg-blue-800"
          >
            login
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-slate-800">Don't want to buy anything? go to <Link className="border-b-2 border-blue-500" to="/">Home</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;