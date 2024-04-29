/**
 * API endpoints for user and house management.
 */

/*
USER MANAGEMENT
*/

//houseOwner
export const USER_EXISTS_API_ENDPOINT = "./api/userExists";

export const REGISTER_USER_API_ENDPOINT = "./api/register";

export const USER_ROLE_API_ENDPOINT = "/api/userRole";

export const EDIT_USER_API_ENDPOINT = "/api/editUser";

export const DELETE_USER_API_ENDPOINT = (_id: string) =>
  `/api/deleteUser?userId=${_id}`;

//govUser
export const REGISTER_GOV_USER_API_ENDPOINT = `/api/registerGovUser`;

export const EDIT_GOV_USER_API_ENDPOINT = "/api/editGovUser";

/*
HOUSE MANAGEMENT
*/

//houseOwner
export const REGISTER_HOUSE_API_ENDPOINT = "./api/registerHouse";

export const HOUSE_IN_RECORDS_API_ENDPOINT = "./api/housesInRecord";

export const DELETE_HOUSE_API_ENDPOINT = `/api/deleteHouse`;

export const EDIT_HOUSE_API_ENDPOINT = (houseId: string) =>
  `/api/editHouse/${houseId}`;

//govUser

export const GET_ALL_HOUSES_IN_RECORD_API_ENDPOINT = "/api/allHousesInRecord";
