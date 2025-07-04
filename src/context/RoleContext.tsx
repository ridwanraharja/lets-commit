import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserRole = "participant" | "organizer";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>("participant");

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole;

    // If there's a valid role in localStorage, use it
    if (
      savedRole &&
      (savedRole === "participant" || savedRole === "organizer")
    ) {
      setRoleState(savedRole);
    } else {
      // If no valid role found, set default to "participant" and save to localStorage
      setRoleState("participant");
      localStorage.setItem("userRole", "participant");
      console.log(
        "No valid role found in localStorage, defaulting to 'participant'"
      );
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("userRole", newRole);
    console.log(`Role changed to: ${newRole}`);
  };

  const toggleRole = () => {
    const newRole = role === "participant" ? "organizer" : "participant";
    setRole(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
};
