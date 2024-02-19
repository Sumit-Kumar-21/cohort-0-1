import { Context, Hono } from "hono";
import {
  handleGetPostById,
  handlePostDeleteById,
  handlePostPostreq,
  handlePutById,
  handleSigninPostreq,
  handleSignupPostreq,
  handlegetPosts,
  handlegetUserPosts,
} from "../controller/user";
import { authmiddleware } from "../middleware/user";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const router = new Hono();

router.post("/signup", handleSignupPostreq);
router.post("/signin", handleSigninPostreq);
router.get("/all-posts", authmiddleware, handlegetPosts);
router.get("/posts", authmiddleware, handlegetUserPosts);
router.post("/create-post", authmiddleware, handlePostPostreq);
router.get("/post/:id", authmiddleware, handleGetPostById);
router.put("/post/:id", authmiddleware, handlePutById);
router.delete("/post/:id", authmiddleware, handlePostDeleteById);

// router.get("/check", authmiddleware)

router.get("/users", async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl:
      "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNmZmN2VlNGMtNWE3NC00ZDg2LTgxMjctNDc1NWVmZGU4ZGYxIiwidGVuYW50X2lkIjoiM2Q4YTJjY2Y0NmIwMGQ1NjlmYzc1ZjA5MzZkZGZhNTg1MWFkOGQ3N2ZlMGI4NDBlMjcyYmFjZDRjZWM0OGU5ZSIsImludGVybmFsX3NlY3JldCI6ImZkNzgxMDJjLWFkNDUtNDIyNS05MGI1LTI0MDZmYWYyNjY1ZCJ9.0aSNcQRuDBBWYhjolk-zIP3tHzoy-QJlPzjUPvBC5tM",
  }).$extends(withAccelerate());

  const res = await prisma.user.findMany();
  return c.json({
    users: res.map(user=>({
      id: user.id,
      username: user.username,
      email: user.email
    })),
  });
});
