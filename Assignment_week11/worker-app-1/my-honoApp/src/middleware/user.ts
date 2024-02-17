import { Context, Next } from "hono";
import { env } from "hono/adapter";
import { Jwt } from "hono/utils/jwt";




export async function authmiddleware(c: any, next: Next) {
  const JWT_TOKEN ="mytoken";
    const token =c.req.header("Authorization")
  if (token) {
    // const { JWT_TOKEN } = env<{
    //   JWT_TOKEN: string;
    // }>(c);

    const decode= await Jwt.verify(token, JWT_TOKEN);
    if(decode.userId){

        c.req.userId = decode.userId;
        await next();
    }else{
        return c.json({message: "invalid token"});
    }
  }
}
