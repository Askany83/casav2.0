export const houseOwnerProfileFetch = async (email: string) => {
  try {
    // Check if data is already present in sessionStorage
    const storedData = sessionStorage.getItem("houseOwnerProfile");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("User data fetched from sessionStorage:", parsedData);
      return parsedData;
    }

    // Data not present in sessionStorage, fetch from MongoDB
    const response = await fetch(
      `/api/houseOwnerProfile?email=${encodeURIComponent(email)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data from MongoDB");
    }
    const userFromMongoDB = await response.json();
    console.log("User data fetched from MongoDB:", userFromMongoDB);

    // Store fetched data in sessionStorage
    sessionStorage.setItem(
      "houseOwnerProfile",
      JSON.stringify(userFromMongoDB)
    );

    return userFromMongoDB;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
