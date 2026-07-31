import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // api, _next, _vercel ve uzantılı dosyalar (görsel vb.) hariç her yol
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
