export { default } from "next-auth/middleware";

// middleware to protected routes - add pages you want to make sure ONLY THE LOGIN USER CAN ACCESS
export const config = {
  matcher: [
    "/dashboard",
    "/housesInRecord",
    "/registerHouse",
    "/house/[_id]",
    "/editHouse/[_id]",
    "/houseOwnerProfile/[email]",
  ],
};
