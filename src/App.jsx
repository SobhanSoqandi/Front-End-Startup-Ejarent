import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthContainer from "./Pages/Auth/AuthContainer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import CompleteProfile from "./Pages/Auth/CompleteProfile"
import AppLayout from "./UI/AppLayout"
import AdminPanelLayout from "./Pages/Admin/AdminPanelLayout"
import ProtectedRoute from "./UI/ProtectedRoute"
import Landing from "./Pages/Landing/Landing"
import LandingLayout from "./UI/Landing/LandingLayout"
import SingleAdv from "./Pages/Adv/SingleAdv"
import AddAdv from "./Pages/Adv/AddAdv"


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
            <Route />
            <Route path="/auth" element={<AuthContainer />} />
            <Route path="/add" element={<AddAdv />} />
            {/* <Route path="/complete-profile" element={<CompleteProfile />} /> */}
            {/* <Route path="/singleAds" element={<SingleAds />} /> */}

            <Route path="/panel"
              element={
                // <ProtectedRoute>
                <AdminPanelLayout />
                //  </ProtectedRoute>
              } >
              {/* outlet */}
              <Route path="complete-profile" element={<CompleteProfile />} />

            </Route>

            <Route path="/" element={<LandingLayout />} >
              <Route path="" element={<Landing />} />
              <Route path="/adv/:id" element={<SingleAdv />} />
            </Route>

          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>

  )
}

export default App
