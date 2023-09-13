import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = [
    "/",
    "/auth/login",
    "/auth/signup",
    "/auth/password/forgot",
    "/auth/password/reset/:token",
  ];

  // Check if the path is in the publicPaths array
  const isPublicPath = publicPaths.includes(path);

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // Redirect authenticated users to the home page  
      return NextResponse.redirect(new URL("/", request.url));  
    }
 

  if (!isPublicPath && !token) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/user/profile",
    "/auth/login",
    "/auth/signup",
    "/auth/verifyemail",
    "/auth/password/forgot",
    "/auth/password/reset/:token",
    "/auth/password/change",
  ],
};
