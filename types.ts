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
