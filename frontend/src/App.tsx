import { Layout } from "./Layout"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Signup from "./pages/Signup";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path='/'               element={<Layout><Home /></Layout>} />
          <Route path='/about'          element={<Layout><About /></Layout>} />
          <Route path='/login'          element={<Layout><Login /></Layout>} />
          <Route path='/signup'         element={<Layout><Signup /></Layout>} />
          <Route path='/categories'     element={<Layout><Categories /></Layout>} />
          <Route path='/categories/:categoryName' element={<Layout><Category /></Layout>} />
          <Route path='/products/:id'   element={<Layout><Product /></Layout>} />

          {/* Protected User Routes */}
          <Route 
            path='/cart' 
            element={<ProtectedRoute><Layout><Cart /></Layout></ProtectedRoute>} 
          />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App