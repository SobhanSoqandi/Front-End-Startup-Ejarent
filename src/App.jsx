import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthContainer from "./Pages/Auth/AuthContainer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

function App() {



  const queryClient = new QueryClient()

  return (


    <div dir="rtl" >
      <BrowserRouter>
         <Toaster
         position="top-left"
        reverseOrder={false} 
      />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/auth" element={<AuthContainer />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>

  )
}

export default App
