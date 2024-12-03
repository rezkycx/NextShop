const HeaderSection = ({children}) => {
  return (
    <h1 
      className="text-2xl font-bold px-5 my-4 border-b-2 pb-3 text-blue-950"
    >
      {children}
    </h1>
  )
}

export default HeaderSection;