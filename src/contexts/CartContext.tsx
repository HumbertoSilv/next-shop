import { ReactNode, createContext, useState } from "react"

interface Product {
  id: string,
  name: string,
  imageUrl: string,
  price: string,
  defaultPriceId: string,
}

interface CartProduct extends Product {
  quantity?: number
}

interface CartContextType {
  cartList: CartProduct[]
  total: number
  addToCart: (product: Product) => void
  removeOfCart: (productId: string) => void
  clearCart: () => void
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartList, setCartList] = useState<CartProduct[]>([])

  const addToCart = (product: Product) => {
    const alreadyExists = cartList.find(({id}) => id === product.id)

    alreadyExists
      ? setCartList((state) =>
          state.map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              }
            }
            return item
          }),
        )
      : setCartList((state) => [
          ...state,
          {
            ...product,
            quantity: 1,
          },
        ])
  }

  const removeOfCart = (productId: string) => {
    setCartList((list) => list.filter((product) => product.id !== productId))
  }

  const clearCart = () => {}

  const total = cartList.reduce((acc, cur) => {
    return acc + cur.quantity * parseInt(cur.price.slice(2))
  }, 0)

  return (
    <CartContext.Provider value={{
      cartList,
      total,
      addToCart,
      removeOfCart,
      clearCart
      }}>
      {children}
    </CartContext.Provider>
  )
}