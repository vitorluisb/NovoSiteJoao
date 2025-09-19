import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import AboutPage from "@/react-app/pages/About";
import ShopPage from "@/react-app/pages/Shop";
import ServicesPage from "@/react-app/pages/Services";
import ContactPage from "@/react-app/pages/Contact";
import AdminLogin from "@/react-app/pages/AdminLogin";
import AdminDashboard from "@/react-app/pages/AdminDashboard";
import Layout from "@/react-app/components/Layout";
import { AuthProvider } from "@/react-app/hooks/useAuth.tsx";
import { CartProvider } from "@/react-app/hooks/useCart.tsx";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <Routes>
          {/* Admin routes without layout */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Public routes with layout */}
          <Route path="/" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
          <Route path="/sobre" element={
            <Layout>
              <AboutPage />
            </Layout>
          } />
          <Route path="/loja" element={
            <Layout>
              <ShopPage />
            </Layout>
          } />
          <Route path="/servicos" element={
            <Layout>
              <ServicesPage />
            </Layout>
          } />
          <Route path="/contato" element={
            <Layout>
              <ContactPage />
            </Layout>
          } />
        </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
