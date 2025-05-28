import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
const MainLayout = lazy(() => import("@layouts/MainLayout"));
const ProfileLayout = lazy(() => import("@layouts/ProfileLayout"));
import AuthLayout from "@layouts/AuthLayout";

// Components
import PageSuspenseFallback from "@components/feedback/PageSuspenseFallback";

// Pages
const Products = lazy(() => import("@pages/Products"));
const ProductDetails = lazy(() => import("@pages/ProductDetails"));
const Brands = lazy(() => import("@pages/Brands"));
const Categories = lazy(() => import("@pages/Categories"));
const Home = lazy(() => import("@pages/Home"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Orders = lazy(() => import("@pages/account/Orders"));
const Account = lazy(() => import("@pages/account/Account"));
const ChangePassword = lazy(() => import("@pages/account/ChangePassword"));
const Payment = lazy(() => import("@pages/payment"));

// Auth Pages
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import ForgotPassword from "@pages/auth/ForgotPassword";
import ResetPassword from "@pages/auth/ResetPassword";
import VerifyResetCode from "@pages/auth/VerifyResetCode";

// Error Handling
import Error from "@pages/Error";

// Protected Routes
import ProtectedRoute from "@components/Auth/ProtectedRoute";
import ProtectedLayout from "./ProtectedLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <Error />, // Handles all rendering errors in child routes
    children: [
      // Auth Routes
      {
        element: <AuthLayout />,
        errorElement: <Error />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "forgot-password",
            element: (
              <PageSuspenseFallback>
                <ForgotPassword />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "verify-reset-code",
            element: (
              <PageSuspenseFallback>
                <VerifyResetCode />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "reset-password",
            element: (
              <PageSuspenseFallback>
                <ResetPassword />
              </PageSuspenseFallback>
            ),
          },
        ],
      },

      // Main Routes
      {
        element: (
          <PageSuspenseFallback>
            <MainLayout />
          </PageSuspenseFallback>
        ),
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: (
              <PageSuspenseFallback>
                <Home />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "categories",
            element: (
              <PageSuspenseFallback>
                <Categories />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "cart",
            element: (
              <ProtectedRoute>
                <PageSuspenseFallback>
                  <Cart />
                </PageSuspenseFallback>
              </ProtectedRoute>
            ),
          },
          {
            path: "payment",
            element: (
              <ProtectedRoute>
                <PageSuspenseFallback>
                  <Payment />
                </PageSuspenseFallback>
              </ProtectedRoute>
            ),
          },
          {
            path: "wishlist",
            element: (
              <ProtectedRoute>
                <PageSuspenseFallback>
                  <Wishlist />
                </PageSuspenseFallback>
              </ProtectedRoute>
            ),
          },
          {
            path: "products/:categoryId",
            element: (
              <PageSuspenseFallback>
                <Products />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "product-details/:id",
            element: (
              <PageSuspenseFallback>
                <ProductDetails />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "brands",
            element: (
              <PageSuspenseFallback>
                <Brands />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <PageSuspenseFallback>
                  <ProfileLayout />
                </PageSuspenseFallback>
              </ProtectedRoute>
            ),
            children: [
              {
                index: true,
                element: (
                  <PageSuspenseFallback>
                    <Account />
                  </PageSuspenseFallback>
                ),
              },
              {
                path: "orders",
                element: (
                  <PageSuspenseFallback>
                    <Orders />
                  </PageSuspenseFallback>
                ),
              },
              {
                path: "change-password",
                element: (
                  <PageSuspenseFallback>
                    <ChangePassword />
                  </PageSuspenseFallback>
                ),
              },
            ],
          },
        ],
      },

      // Catch-all route for 404 errors
      {
        path: "*",
        element: <Error />, // Will show for any undefined route
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
