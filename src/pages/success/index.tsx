import Link from "next/link"
import { ImagesContainer, ImageCardContainer, SuccessContainer } from "../../styles/pages/success"
import { GetServerSideProps } from "next"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
import Image from "next/image"
import Head from "next/head"

interface Product {
  name: string
  imageUrl: string
}
interface SuccessProps {
  customerName: string
    products: Product[]
}

const Success = ({customerName, products}: SuccessProps) => {
  console.log({customerName, products});
  
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex"/>
      </Head>

      <SuccessContainer>
        <ImagesContainer>
          {products.map((product) => {
            return (
              <ImageCardContainer key={product.name}>
                <Image 
                  src={product.imageUrl}
                  placeholder="blur"
                  blurDataURL="../../assets/imgBlur.png"
                  width={145}
                  height={145}
                  alt="" />
              </ImageCardContainer>
            )
          })}
        </ImagesContainer>
        
        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, 
            seu pedido
            {products.map((prod) => {
              return (
              <strong key={prod.name}>
                {` ${prod.name} `}
              </strong>)
            })} 
            já está a caminho da sua casa.
        </p>

        <Link href='/'>
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export default Success

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })
  
  const customerName = session.customer_details.name
  const products = session.line_items.data.map((item) => item.price.product as Stripe.Product)

  return {
    props: {
      customerName,
      products: products.map((product) => ({
        name: product.name,
        imageUrl: product.images[0]
      }))
    }
  }
}