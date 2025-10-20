import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthContainer from "./Pages/Auth/AuthContainer"

function App() {



  return (


    <div dir="rtl" >
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthContainer />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
