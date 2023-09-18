import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
import Image from "next/image"
import axios from "axios"
import { useContext, useState } from "react"
import Head from "next/head"
import { CartContext } from "../../contexts/CartContext"

interface ProductsProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    defaultPriceId: string,
  }
}

const Products = ({ product }: ProductsProps) => {
  const { query, isFallback, push } = useRouter()
  const { addToCart } = useContext(CartContext)


  // TODO: Loading component
  if (isFallback) {
    return <h1>Loading</h1>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            placeholder="blur"
            blurDataURL="../../assets/imgBlur.png"
            width={520}
            height={480}
            alt=""
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button 
            onClick={() => addToCart(product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export default Products

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      // { params: { productId: 'prod_OSpFDKW0NrCJVV' } }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { productId: string }> = async ({ params }) => {
  const { productId } = params

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })
  const { unit_amount, id } = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(unit_amount / 100),
        description: product.description,
        defaultPriceId: id
      }
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }

}