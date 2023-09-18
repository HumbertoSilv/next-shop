import { X } from "phosphor-react"
import { SideBarContainer, SideBarList, SideBarTotal, CartItem } from "../../styles/components/sideBar"
import Image from "next/image"
import { useContext, useState } from "react"
import { CartContext } from "../../contexts/CartContext"
import axios from "axios"

const SideBar = ({ showCart, setShowCart }) => {
  const { cartList, removeOfCart, total } = useContext(CartContext)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', 
        cartList.map(({defaultPriceId, quantity}) => ({
          defaultPriceId,
          quantity
        }))
      )

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
      // push.('/checkout')
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout.')
    }
  }
  
  return (
    <SideBarContainer className={showCart? 'enable' : 'disable'}>
      <button
        className="close"
        onClick={() => setShowCart(false)}
      >
        <X size={28} color="#8D8D99" weight="bold" />
      </button>
      <h1>Sacola de compras</h1>

      <SideBarList>
        {cartList.map(({id, name, price, imageUrl}) => {
          return (
            <CartItem key={id}>
              <Image
                src={imageUrl}
                placeholder="blur"
                blurDataURL="../../assets/imgBlur.png"
                width={110}
                height={100}
                alt=""
              />

              <div>
                <h2>{name}</h2>
                <span>{price}</span>
                <button
                  onClick={() => removeOfCart(id)}
                >Remover</button>
              </div>
            </CartItem>
          )
        })}
      </SideBarList>

      <SideBarTotal>
        <span>Quantidade</span>
        <span>{cartList.length} itens</span>

        <h2>Valor total</h2>
        <h2>{
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(total)}
        </h2>
      </SideBarTotal>

      <button 
        className="buy"
        disabled={isCreatingCheckoutSession || !cartList.length}
        onClick={handleBuyProduct}
        >
        Finalizar compra
      </button>
    </SideBarContainer>
  )
}

export default SideBar
