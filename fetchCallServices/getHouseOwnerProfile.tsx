/**
 * Fetches house owner profile data for the user with the given email.
 *
 * First checks sessionStorage for cached user data.
 * If available, returns the cached user object matching the email.
 *
 * If not cached, makes API call to fetch all users,
 * finds the one matching the email,
 * caches the user data in sessionStorage,
 * and returns the user object.
 *
 * Handles and propagates any errors.
 */

export const houseOwnerProfileFetch = async (email: string) => {
  try {
    // Check if user data is available in sessionStorage
    const cachedData = sessionStorage.getItem("cachedUserData");
    if (cachedData) {
      const cachedUsers = JSON.parse(cachedData);
      const user = cachedUsers.find((user: any) => user.email === email);
      if (user) {
        console.log("User data fetched from cache:", user);
        return user;
      }
    }

    // If user data is not available in sessionStorage, fetch it from the API
    const response = await fetch(`/api/houseOwnerProfile/`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const users = await response.json();
    // Find the user with the matching email
    const user = users.find((user: any) => user.email === email);
    console.log("User data fetched from API:", user);

    // Cache the fetched user data in sessionStorage
    if (user) {
      // Filter out sensitive fields (e.g., password) before caching
      const { password, ...userDataWithoutPassword } = user;
      const cachedData = sessionStorage.getItem("cachedUserData");
      const cachedUsers = cachedData ? JSON.parse(cachedData) : [];
      const updatedUsers = [...cachedUsers, userDataWithoutPassword];
      sessionStorage.setItem("cachedUserData", JSON.stringify(updatedUsers));
    }

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
