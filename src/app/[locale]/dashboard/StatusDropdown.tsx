'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { changeOrderStatus } from './actions'
import { useRouter } from 'next/navigation'
// the orderStatus is the type we created in prisma folder
// we say keyof OrderStatus because we say ONLY these three are valid
// we say typeof string because of type-safety
const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awaiting_shipment: 'Awaiting Shipment',
  fulfilled: 'Fulfilled',
  shipped: 'Shipped',
}

const StatusDropdown = ({
  id,
  orderStatus,
}: {
  id: string
  orderStatus: OrderStatus
}) => {
  const router = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['change-order-status'],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh(),
  })

  return (
    <DropdownMenu>
      {/* as said before, we say "asChild" because we want to define the button ourSelves and do not want the trigger to act as a button */}
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='w-52 flex justify-between items-center'>
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        {/* mapping through the only object keys of OrderStatus for dropdown */ }
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              'flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',
              {
                'bg-zinc-100': orderStatus === status,
              }
            )}
            /* we use react query to cache the new status which we defined in actions.ts
            in order to change it in the dropdown and the database */
            onClick={() => mutate({ id, newStatus: status as OrderStatus })}>
            <Check
              className={cn(
                'mr-2 h-4 w-4 text-primary',
                orderStatus === status ? 'opacity-100' : 'opacity-0'
              )}
            />
            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StatusDropdown
