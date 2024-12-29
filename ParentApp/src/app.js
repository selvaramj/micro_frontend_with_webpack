import React, { lazy, Suspense } from "react";
import "./app.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/Home";

const Header = lazy(() => import("app1/Header"));
const Footer = lazy(() => import("app2/Footer"));

const Layout = () => {
  return (
    <>
      <Suspense fallback={<p>Loading....</p>}>
        <Header />
      </Suspense>
      <HomePage />
      <Suspense fallback={<p>Loading....</p>}>
        <Footer />
      </Suspense>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
