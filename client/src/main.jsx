import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/useAuth.jsx'
import { ProductProvider } from './context/useProducts.jsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { OrderProvider } from './context/useOrder.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PayPalScriptProvider>
  <AuthProvider>
    <ProductProvider>
      <OrderProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </OrderProvider>
    </ProductProvider>
  </AuthProvider>
  </PayPalScriptProvider>,
)
