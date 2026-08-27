"use client";

import { ButtonProps } from "@/types";
import React from "react";

export default function Button({
  children,
  onClick,
  isDefault = false,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps): React.ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer
        ${
          isDefault
            ? "bg-teal-600 text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            : ""
        }
        ${className}`}
    >
      {children}
    </button>
  );
}
