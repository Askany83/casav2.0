export { default } from "next-auth/middleware";

// middleware to protected routes - add pages you want to make sure ONLY THE LOGIN USER CAN ACCESS
export const config = {
  matcher: [
    //houseOwner routes
    "/registerHouse",
    "/housesInRecord",
    "/house/:path*",
    "/editHouse/:path*",
    "/houseOwnerProfile/:path*",
    "/editUser/:path*",
    "/helpRequestAnswer/:path*",
    "/grant1/:path*",
    "/grant2/:path*",
    "/grant3/:path*",
    "/grants",

    // govUser routes
    "/allHousesInRecord",
    "/houseDetails/:path*",
    "/govUserProfile/:path*",
    "/editGovUser/:path*",
    "/housesInMap",

    //for both user types: houseOwner n' govUser
    "/access-denied",
  ],
};
