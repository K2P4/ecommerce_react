import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AboutPage,
  AddToCartPage,
  CartPage,
  CategoryDetailPage,
  CategoryPage,
  CheckOutPage,
  ClientLoginPage,
  ClientRegisterPage,
  ContactUsPage,
  DashboardPage,
  HomePage,
  InvoiceDetailPage,
  InvoicesPage,
  LoginPage,
  OrderCurrentPage,
  OrderDetailPage,
  OrderHistoryPage,
  OrderShopHistoryPage,
  ProductPage,
  ProductsPage,
  ProfilePage,
  RegisterPage,
  StockDetailPage,
  StockPage,
} from "./pages";
import MainLayout from "./MainLayout";
import { OrderTabComponent, ProductDetailComponent } from "./Components";
import AdminRouteGuardComponent from "./Guard/AdminRouteGuard.component";
import ClientRouteGuardComponent from "./Guard/ClientRouteGuard.component";
import PublicGuardComponent from "./Guard/PublicGuard.component";
import ClientPermessionGuardComponent from "./Guard/ClientPermessionGuard.component";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Admin */}
        <Route element={<AdminRouteGuardComponent />}>
          <Route path="/admin" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="stock" element={<StockPage />} />
            <Route path="stock/:id" element={<StockDetailPage />} />
            <Route path="stock/cart" element={<CartPage />} />
            <Route path="order/history" element={<OrderHistoryPage />} />
            <Route path="order/:id" element={<OrderDetailPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="invoice/:id" element={<InvoiceDetailPage />} />
          </Route>
        </Route>

        <Route element={<ClientPermessionGuardComponent />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact-us" element={<ContactUsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="category/:id" element={<CategoryDetailPage />} />
          </Route>
        </Route>

        {/* Client */}
        <Route element={<ClientRouteGuardComponent />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="invoices" element={<AddToCartPage />} />
            <Route path="order" element={<OrderTabComponent />} />
            <Route path="order/history" element={<OrderShopHistoryPage />} />
            <Route path="order/current" element={<OrderCurrentPage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="products/:id" element={<ProductDetailComponent />} />
            <Route path="products/cart" element={<AddToCartPage />} />
            <Route path="products/checkout" element={<CheckOutPage />} />
          </Route>
        </Route>

        {/* Auth */}
        <Route element={<PublicGuardComponent />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/client/login" element={<ClientLoginPage />} />
          <Route path="/client/register" element={<ClientRegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
