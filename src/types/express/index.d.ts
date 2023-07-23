import { UserInfoJWT } from '../custom';

declare global {
  namespace Express {
    interface Request {
      user?: UserInfoJWT;
    }
  }
}