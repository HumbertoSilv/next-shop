import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"
import Link from "next/link"
import Image from "next/image"
import { Handbag } from "phosphor-react"
import logoImg from "../../assets/logo.svg"
import { Container, CartButton, Counter } from "../../styles/components/Header"

const Header = ({ setShowCart }) => {
  const { cartList } = useContext(CartContext)

  return (
    <Container>
      <Link href="/">
        <Image
          src={logoImg}
          placeholder="blur"
          blurDataURL={logoImg.src}
          alt=""
      />
      </Link>

      <CartButton
        onClick={() => setShowCart(true)}
        color='gray'
      >
        {cartList.length > 0 && <Counter>{cartList.length}</Counter>}
        <Handbag weight="bold" size={30} />
      </CartButton>
    </Container>
  )
}

export default Header