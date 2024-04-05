export { default } from "next-auth/middleware";

// middleware to protected routes - add pages you want to make sure ONLY THE LOGIN USER CAN ACCESS
export const config = {
  matcher: [
    "/dashboard",
    "/registerHouse",
    "/housesInRecord",
    "/house/:path*",
    "/editHouse/:path*",
    "/houseOwnerProfile/:path*",
    "/editUser/:path*",
    "/dashboardGovUser",
    "/access-denied",
    "/allHousesInRecord",
    "/houseDetails/:path*",
  ],
};
