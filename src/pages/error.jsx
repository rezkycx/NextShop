import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div className="h-screen flex justify-center items-center bg-neutral-50">
      <div className="min-w-64 w-full max-w-sm">
        <img src="/images/404-error-page.svg" alt="404 error page" />
        <p className="text-center text-3xl font-bold text-blue-950">Error: {error.status}</p>
      </div>
    </div>
  )
}

export default ErrorPage;