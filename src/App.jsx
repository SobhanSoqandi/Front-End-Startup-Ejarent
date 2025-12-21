import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthContainer from "./Pages/Auth/AuthContainer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import CompleteProfile from "./Pages/Auth/CompleteProfile"
import AppLayout from "./UI/AppLayout"
import AdminPanelLayout from "./Pages/Admin/AdminPanelLayout"
import ProtectedRoute from "./UI/ProtectedRoute"


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
            <Route path="complete-profile" element={<CompleteProfile />} />

            <Route path="/panel"
              element={
                <ProtectedRoute>
                  <AdminPanelLayout />
                </ProtectedRoute>
              } >

            </Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>

  )
}

export default App
