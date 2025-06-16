import { Gender, UserRole } from "@/lib/enums";

export interface UserInterface {
  id: string;
  email: string;
  email_is_verified: boolean;
  mobile_phone?: string;
  mobile_phone_is_verified: boolean;
  first_name: string;
  last_name: string;
  avatar: string;
  gender: Gender;
  user_role: UserRole;
  hashed_password: string;
}
