import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './context/tokenContext.jsx'
import FavoritesContextProvider from './context/favoritesContext.jsx'
import CartContextProvider from './context/cartContext.jsx'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import CheckoutContextProvider from './context/checkoutContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
          <TokenContextProvider>
            <CartContextProvider>
          <FavoritesContextProvider>
            <CheckoutContextProvider>

<App/>
</CheckoutContextProvider>
</FavoritesContextProvider>
</CartContextProvider>
        </TokenContextProvider>
  </StrictMode>,
)
