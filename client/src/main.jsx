
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/useAuth.jsx'
import { ProductProvider } from './context/useProducts.jsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { OrderProvider } from './context/useOrder.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PayPalScriptProvider options={{
    clientId: "ARI-4Y-pmTFV1PFpX4fLBr0wSnlUcXYnv0VihlwYs-g8HnqssuH6_45tbSQxlnhgH6moNDuH3F6G0i4I",
    currency: "USD"
    }}>
  <AuthProvider>
    <ProductProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </ProductProvider>
  </AuthProvider>
  </PayPalScriptProvider>,
)
