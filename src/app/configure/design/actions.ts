'use server'

import { db } from '@/db'
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from '@prisma/client'

export type SaveConfigArgs = {
  // we already can use the types we defined in Prisma as enums !
  color: CaseColor
  finish: CaseFinish
  material: CaseMaterial 
  model: PhoneModel
  configId: string
}
// NOTE : what we're doing here is called an RPC pattern (remote procedure call) , this is an awesome
// pattern which we can integrate with database literally using functions without the use of a 
// POST request or anything (you can see we're updating db just by functions)
export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model },
  })
}
