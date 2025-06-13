import { User } from "./user";

export interface ProfileDropdownProps {
  userProfile: User;
  onLogout: () => void;
}