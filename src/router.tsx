import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import IndexPage from "./routes/IndexPage";
import ProductPage from "./routes/ProductPage";
import ContactPage from "./routes/ContactPage";
import WallpapersPage from "./routes/WallpapersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <IndexPage /> },
      { path: "product", element: <ProductPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "wallpapers", element: <WallpapersPage /> },
    ],
  },
]);
