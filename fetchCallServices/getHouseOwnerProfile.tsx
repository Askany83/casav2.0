export const houseOwnerProfileFetch = async (email: string) => {
  try {
    // Check if user data is available in sessionStorage
    const cachedData = sessionStorage.getItem("cachedUserData");
    if (cachedData) {
      const cachedUsers = JSON.parse(cachedData);
      const cachedUser = cachedUsers.find((user: any) => user.email === email);
      if (cachedUser) {
        // Check MongoDB for updated user data
        const response = await fetch(`/api/houseOwnerProfile/`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data from MongoDB");
        }
        const usersFromMongoDB = await response.json();
        const userFromMongoDB = usersFromMongoDB.find(
          (user: any) => user.email === email
        );

        // Compare user data from session storage and MongoDB
        if (
          userFromMongoDB &&
          JSON.stringify(cachedUser) !== JSON.stringify(userFromMongoDB)
        ) {
          // Update session storage with new user data from MongoDB
          const updatedUsers = cachedUsers.map((user: any) =>
            user.email === email ? userFromMongoDB : user
          );
          sessionStorage.setItem(
            "cachedUserData",
            JSON.stringify(updatedUsers)
          );
          // console.log("User data updated in sessionStorage - getHouseOwnerProfile:", userFromMongoDB);
          return userFromMongoDB;
        } else {
          // console.log(
          //   "User data fetched from cache - getHouseOwnerProfile:",
          //   cachedUser
          // );
          return cachedUser;
        }
      }
    }

    // If user data is not available in sessionStorage or not found, fetch it from MongoDB
    const response = await fetch(`/api/houseOwnerProfile/`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data from MongoDB");
    }
    const usersFromMongoDB = await response.json();
    const userFromMongoDB = usersFromMongoDB.find(
      (user: any) => user.email === email
    );
    console.log("User data fetched from MongoDB:", userFromMongoDB);

    // Cache the fetched user data in sessionStorage
    if (userFromMongoDB) {
      const cachedUsers = [
        ...(cachedData ? JSON.parse(cachedData) : []),
        userFromMongoDB,
      ];
      sessionStorage.setItem("cachedUserData", JSON.stringify(cachedUsers));
    }

    return userFromMongoDB;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
