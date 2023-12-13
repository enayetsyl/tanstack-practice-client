import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './Home';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import SingleProduct from './SingleProduct';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/addProduct",
    element: <AddProduct/>,
  },
  {
    path: "/editProduct/:id",
    element: <EditProduct/>
  },
  {
    path: "/singleProduct/:id",
    element: <SingleProduct/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  </QueryClientProvider>
</React.StrictMode>
)
