import { useState, useEffect } from "react";

const useUserData = (houseOwnerId: string) => {
  const [userData, setUserData] = useState(null);
  console.log("userData:", userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve users from sessionStorage
        const usersString = sessionStorage.getItem("users");
        if (usersString) {
          const users = JSON.parse(usersString);
          const user = users.find(
            (user: { _id: string }) => user._id === houseOwnerId
          );
          if (user) {
            setUserData(user);
            console.log("userData", user);
          } else {
            console.log("User not found");
          }
        } else {
          // Fetch users from the API if not stored in sessionStorage
          const response = await fetch("/api/getAllUsers");
          if (response.ok) {
            const users = await response.json();
            // Store users in sessionStorage
            sessionStorage.setItem("users", JSON.stringify(users));
            // Find the user by ID
            const user = users.find(
              (user: { _id: string }) => user._id === houseOwnerId
            );
            if (user) {
              setUserData(user);
              console.log("userData", user);
            } else {
              console.log("User not found");
            }
          } else {
            console.log("Failed to fetch user data");
          }
        }
      } catch (error) {
        console.log("Error fetching user data: " + error);
      }
    };

    fetchData();
  }, [houseOwnerId]);

  return { userData };
};

export default useUserData;
