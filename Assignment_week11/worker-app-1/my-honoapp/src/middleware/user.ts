import { Context, Next } from "hono";
import { env } from "hono/adapter";
import { Jwt } from "hono/utils/jwt";

export async function authmiddleware(c: any, next: Next) {
  const JWT_TOKEN = "mytoken";
  const token: string = c.req.header("Authorization").split(" ")[1];

  try {
    if (token !== null || token !== undefined) {
      const decode = await Jwt.verify(token, JWT_TOKEN);
      if (decode) {
        c.req.userId = decode;
        await next();
      } else {
        return c.body("you are unauthroized user sorry", 401);
      }
    } else {
      return c.body("you are unauthroized user sorry", 401);
    }
  } catch (error) {
    return c.body("you are unauthroized user sorry", 401);
  }
}
