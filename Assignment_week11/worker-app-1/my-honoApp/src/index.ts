import { Hono } from "hono";
import { router } from "./router/user";
const app = new Hono();

app.route("/app/v1/user", router);

// app.post("/signup", async (c: any) => {
//   const body: {
//     username: string;
//     email: string;
//     password: string;
//   } = await c.req.json();

//   const prisma = new PrismaClient({
//     datasourceUrl:
//       "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNmZmN2VlNGMtNWE3NC00ZDg2LTgxMjctNDc1NWVmZGU4ZGYxIiwidGVuYW50X2lkIjoiM2Q4YTJjY2Y0NmIwMGQ1NjlmYzc1ZjA5MzZkZGZhNTg1MWFkOGQ3N2ZlMGI4NDBlMjcyYmFjZDRjZWM0OGU5ZSIsImludGVybmFsX3NlY3JldCI6ImZkNzgxMDJjLWFkNDUtNDIyNS05MGI1LTI0MDZmYWYyNjY1ZCJ9.0aSNcQRuDBBWYhjolk-zIP3tHzoy-QJlPzjUPvBC5tM",
//   }).$extends(withAccelerate());

//   const isUserExist = await prisma.user.findFirst({
//     where: { username: body.email },
//   });

//   if (isUserExist) {
//     return c.json({ msg: "email already exist" });
//   }

//   const res = await prisma.user.create({
//     data: {
//       username: body.username,
//       email: body.email,
//       password: body.password,
//     },
//   });

//   return c.json({ msg: "User created successfully" });
// });

export default app;