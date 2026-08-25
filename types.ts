import { CourseCategory, CourseStatus } from "./enums";

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

//   course

export interface Module {
  _id?: string;
  weekNumber: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WhatYouWillLearn {
  _id?: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseReview {
  _id?: string;
  user: string;
}

export interface CourseInstructor {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  profilePictureUrl: string;
}

export interface Course {
  _id: string;

  title: string;
  description: string;
  category: CourseCategory;
  price: number;

  imageUrl: string;
  imagePublicId: string;

  instructor?: string | CourseInstructor;

  freeAccessWeeks: number;

  modules: Module[];
  whatYouWillLearn: WhatYouWillLearn[];

  rating: number;
  numReviews: number;

  videoCount: number;
  assignmentCount: number;
  enrolledCount: number;
  liveClassCount: number;

  status: CourseStatus;
  rejectionReason: string | null;

  reviews: CourseReview[];

  createdAt: string;
  updatedAt: string;
}
