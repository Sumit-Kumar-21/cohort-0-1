import { Context, Next } from "hono";
import { env } from "hono/adapter";
import { Jwt } from "hono/utils/jwt";

export async function authmiddleware(c: any, next: Next) {
  const JWT_TOKEN = "mytoken";
  const token = c.req.header("Authorization");

  try {
    if (token!==null || token !== undefined) {

      const decode = await Jwt.verify(token, JWT_TOKEN);
      if (decode) {
        c.req.userId = decode;
        await next();
      } else {
        return c.json({ message: "invalid token" });
      }
    }
  } catch (error) {
    return c.json({message: "you dont have token"})
  }
}
