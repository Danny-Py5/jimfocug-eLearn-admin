"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../types";
import { interceptorFetch } from "../interceptor-fetch";
import { toast } from "sonner";

interface UserContextType {
  users: User[];
  isLoading: boolean;
  error: string | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  refetchUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await interceptorFetch("/api/users", {
        method: "GET",
      });

      if (!response.ok) {
        const data = await response.clone().json();
        console.log(data);
        toast.error("Failed to fetch users");
        // throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Users fetch error:", error);
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function x() {
      fetchUsers();
    }
    x();
  }, []);

  return (
    <UserContext.Provider
      value={{
        setUsers,
        users,
        isLoading,
        error,
        refetchUsers: fetchUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUsers must be used inside UsersProvider");
  }

  return context;
}
