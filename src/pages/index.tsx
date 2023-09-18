import { HomeContainer, Product } from "../styles/pages/home"
import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { stripe } from "../lib/stripe"
import { GetServerSideProps, GetStaticProps } from "next"
import Link from "next/link"
import Stripe from "stripe"
import Head from "next/head"
import { Handbag } from "phosphor-react"
import { CartButton } from "../styles/components/Header"
import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    defaultPriceId: string
  }[]
}

const Home = ({ products }: HomeProps) => {
  const { addToCart } = useContext(CartContext)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (

            <Product className="keen-slider__slide" key={product.id}>
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                prefetch={false}
                legacyBehavior
              >
                <Image
                  src={product.imageUrl}
                  placeholder="blur"
                  blurDataURL="../assets/imgBlur.png"
                  width={580}
                  height={520}
                  alt=""
                />
              </Link>

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <CartButton
                  title="Add to Cart"
                  onClick={() => addToCart(product)}
                  color='green'
                >
                  <Handbag weight="bold" size={30} />
                </CartButton>
              </footer>
            </Product>


          )
        })}

      </HomeContainer>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {
    const { unit_amount, id } = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(unit_amount / 100),
      defaultPriceId: id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }

}