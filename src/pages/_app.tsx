import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'
import SideBar from '../components/SideBar'
import { useState } from 'react'
import { CartContextProvider } from '../contexts/CartContext'
import Header from '../components/Header'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [showCart, setShowCart] = useState(false)

  return (
    <Container>
      <CartContextProvider>
        <Header setShowCart={setShowCart}/>
        <SideBar {...{showCart, setShowCart}} />
        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}
