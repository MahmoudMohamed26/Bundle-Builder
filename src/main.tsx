import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "sonner";
import App from "./App.tsx";
import ProductPage from "./pages/product-page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/bundle-builder" replace />} />
        <Route path="/bundle-builder" element={<App />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--primary)",
            border: "1px solid var(--primary)",
            color: "white",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);
