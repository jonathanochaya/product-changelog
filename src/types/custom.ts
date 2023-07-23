import { JwtPayload } from "jsonwebtoken";

export interface UserInfo {
  id: string;
  username: string
}


export interface UserInfoJWT extends JwtPayload, UserInfo {};
