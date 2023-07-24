import { JwtPayload } from "jsonwebtoken";
import internal from "stream";

export interface UserInfo {
  id: string;
  username: string
}

export interface UserInfoJWT extends JwtPayload, UserInfo {};

export type MatchedUpdateInfo = {
  title: string;
  body: string;
  productId: string;
}

export interface AllErrorHandler {
  message: string,
  name: string,
}