import { Toaster } from "@/components/ui/sonner";
import Header from "./_components/Header";




const Provider = ({children}) => {
  return (
    <div>
        <Header />
        <Toaster/>
       {children}
    </div>
  )
}

export default Provider
