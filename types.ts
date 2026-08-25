export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export interface LoginAPIResponse {
  accessToken: string;
  refreshToken: string;
  msg: string;
}

// user

export interface UserJWT {
  id: string;
  tole: string;
}

// types/index.ts

export type UserRole = "USER" | "TUTOR" | "ADMIN";

export interface PurchasedCourse {
  course: string;
  purchasedAt: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  isVerified: boolean;
  profilePictureUrl: string;
  profilePicturePublicId: string;
  bookmarks: string[];
  purchasedCourses: PurchasedCourse[];
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
