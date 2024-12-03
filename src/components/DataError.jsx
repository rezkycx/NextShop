const DataError = ({message}) => {
  return (
    <div className="mt-5 flex justify-center">
      <div>
        <img src="/images/data-404.svg" alt="data error" />
        <p className="text-red-500 font-semibold">{message}</p>
      </div>
    </div>
  )
}

export default DataError;