'use server'

import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
// we need to recieve orderId because it's passed as a query params in the url
// and we need it to check the status of the order
export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id || !user.email) {
    throw new Error('You need to be logged in to view this page.')
  }
// here we need to find the order >> to send to thank-you page 
  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  })

  if (!order) throw new Error('This order does not exist.')
// here if the order was not paid , we're not gonna return the order! simple as that!
  if (order.isPaid) {
    return order
  } else {
    return false
  }
}
