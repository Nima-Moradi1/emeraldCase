// middleware.js

import createMiddleware from 'next-intl/middleware';

console.log("_______________middleware is loading correctly______________");

export default function customMiddleware(request : any) {
  const response = createMiddleware({
    locales: ['en', 'fa'],
    defaultLocale: 'en'
  })(request);
  return response;
}

export const config = {
  matcher: ['/', '/(fa|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)', '/([\\w-]+)?/api/(.+)']
};
