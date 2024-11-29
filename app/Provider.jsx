import Header from "./_components/Header";




const Provider = ({children}) => {
  return (
    <div>
        <Header />
       {children}
    </div>
  )
}

export default Provider
