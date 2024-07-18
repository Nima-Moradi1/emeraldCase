// navbarActions.ts
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const getUserAndRole = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  return { user, isAdmin };
};
