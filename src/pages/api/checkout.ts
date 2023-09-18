import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../lib/stripe"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const payload = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: payload.map(({defaultPriceId, quantity}) => ({
      price: defaultPriceId,
      quantity
    })),
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}

export default handler
