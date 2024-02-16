import { Next } from "hono";
import { env } from "hono/adapter";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function authmiddleware(c: any, next: Next) {
    const token =c.req.header("Authorization")
  if (token) {
    const { JWT_TOKEN } = env<{
      JWT_TOKEN: string;
    }>(c);

    const decode: JwtPayload = jwt.verify(token, JWT_TOKEN)as JwtPayload;
    if(decode.userId){

        c.req.userId = decode.userId;
        await next();
    }else{
        return c.res.body({message: "invalid token"});
    }
  }
}
