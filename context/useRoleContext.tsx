"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserRoleContextType {
  userRole: string;
  setUserRole: (role: string) => void;
}

const defaultContextValue: UserRoleContextType = {
  userRole: "",
  setUserRole: () => {}, // Placeholder function
};

// Create Context with a default value
const UserRoleContext = createContext<UserRoleContextType>(defaultContextValue);

interface UserRoleProviderProps {
  children: ReactNode; // Typing the children prop
}

// Create a Provider Component with typed props
export const UserRoleProvider: React.FC<UserRoleProviderProps> = ({
  children,
}) => {
  const [userRole, setUserRole] = useState<string>("");

  // Value to be passed to consuming components
  const value = { userRole, setUserRole };

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};

// Custom hook to use the userRole context
export const useUserRole = () => useContext(UserRoleContext);
