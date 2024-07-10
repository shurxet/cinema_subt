import React from "react";

export interface HeaderProps {
  accessToken: string | null;
  userProfile: UserProfileType | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onSignUpClick: () => void;
  showProfileMenu: boolean;
  toggleProfileMenu: () => void;
  handleUploadPhoto: (event: React.ChangeEvent<HTMLInputElement>) => void;
}