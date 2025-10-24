import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Layouts/Sidebar";
import Topbar from "./components/Layouts/Topbar";
import Dashboard from "./components/Pages/Dashboard";
import ProductsList from "./components/Pages/ProductsList";
import AddProduct from "./components/Pages/AddProduct";
import EditProduct from "./components/Pages/EditProduct";
import OrdersPage from "./components/Pages/OrdersPage";
import ContactDetails from "./components/Pages/ContactDetails";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Login from "./components/Pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                    <Topbar />
                    <div className="container-fluid">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<ProductsList />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/edit-product/:id" element={<EditProduct />} />
                        <Route path="/order" element={<OrdersPage />} />
                        <Route path="/contact-details" element={<ContactDetails />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
