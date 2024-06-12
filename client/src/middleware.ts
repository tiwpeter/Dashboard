import {NextResponse, type NextRequest} from "next/server";

export function middleware(requset: NextRequest) {
    return NextResponse.redirect(new URL("/dashboard", requset.url));
}

export const config = {
    matcher: "/"
};