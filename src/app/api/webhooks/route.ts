import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
 
export async function POST(req: Request) {
  try {
    // since stripe sends raw text from body , we use text() to make sure it's from stripe
    const body = await req.text()
    // signature is a long piece of string that stripe always sends to us in headers
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return new Response('Invalid signature', { status: 400 })
    }
// we're calling this event because we need to make sure that only stripe is sending us something , not a random user!
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
// this event is the event we got from stripe webhooks 
    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email')
      }
      // and here we're saving the data we need from api from events to session const
      const session = event.data.object as Stripe.Checkout.Session
      // the metadata was created in the actions page of creating a checkout session for 
      //stripe , and userId and orderId was passed as the children of metadata which we're using here
      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      }

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata')
      }
      // i put exclamation marks to tell typescript that i'm sure these exist, don't worry!
      const billingAddress = session.customer_details!.address
      const shippingAddress = session.shipping_details!.address

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state,
            },
          },
        },
      })

      await resend.emails.send({
        from: 'EmeraldCase <mnima8100@gmail.com>',
        //this data object details are coming from stripe checkout session
        to: [event.data.object.customer_details.email],
        subject: 'Thanks for your Order!',
        // the content we want to send (from here)
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          // @ts-ignore
          shippingAddress: {
            name: session.customer_details!.name!,
            city: shippingAddress!.city!,
            country: shippingAddress!.country!,
            postalCode: shippingAddress!.postal_code!,
            street: shippingAddress!.line1!,
            state: shippingAddress!.state,
          },
        }),
      })
    }

    
    return NextResponse.json({ result: event, ok: true })
    
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      { status: 500 }
    )
  }
}
