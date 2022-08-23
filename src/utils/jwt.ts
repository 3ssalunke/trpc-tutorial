import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "abc_change_me_xyz";

export function signJwt(data: object) {
  return jwt.sign(data, JWT_SECRET);
}

export function verifyJwt<T>(token: string) {
  return jwt.verify(token, JWT_SECRET) as T;
}
