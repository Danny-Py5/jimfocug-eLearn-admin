"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Course } from "../../types";
import { interceptorFetch } from "../interceptor-fetch";

interface CourseContextType {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  refetchCourses: () => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await interceptorFetch("/api/courses", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      const courses: Course[] = data.courses;

      setCourses(courses);
    } catch (error) {
      console.error("Course fetch error:", error);
      setError("Failed to load courses");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    function fn() {
      fetchCourses();
    }
    fn();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        setCourses,
        courses,
        isLoading,
        error,
        refetchCourses: fetchCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error("useCourses must be used inside CourseProvider");
  }

  return context;
}
