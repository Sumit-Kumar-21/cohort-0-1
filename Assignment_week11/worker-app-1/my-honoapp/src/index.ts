import { Hono } from "hono";
import { cors } from 'hono/cors'
import { router } from "./router/user";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { Jwt } from "hono/utils/jwt";
const app = new Hono();

app.use('/api/*', cors())
app.route("/api/v1/user", router);

app.use(async (c, next) => {
    await next()
    if (c.error) {
      alert("error from server")
      console.log(c.error);
      
    }
  })

  
export default app;
