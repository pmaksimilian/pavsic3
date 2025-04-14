import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// List of supported locales
const locales = ["sl", "en"]

// Default locale is Slovenian
const defaultLocale = "sl"

// Get the preferred locale from the request
function getLocale(request: NextRequest) {
  // Negotiator expects a plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get the best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // If no Accept-Language header is set or it's empty, use the default locale
  if (!languages || languages.length === 0) {
    return defaultLocale
  }

  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // If it doesn't have a locale, add one based on the Accept-Language header
  if (!pathnameHasLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /sl/products
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url))
  }
}

export const config = {
  // Match all request paths except for:
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - public folder
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}
