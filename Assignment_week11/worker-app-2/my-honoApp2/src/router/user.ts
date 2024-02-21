import { Context, Hono } from "hono";
import {
  handleGetPostById,
  handlePostDeleteById,
  handlePostPostreq,
  handlePutById,
  handleSigninPostreq,
  handleSignupPostreq,
  handlegetPosts,
  handlegetMainUserPosts,
} from "../controller/user";
import { authmiddleware } from "../middleware/user";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const router = new Hono();

router.post("/signup", handleSignupPostreq);
router.post("/signin", handleSigninPostreq);
router.get("/all-posts", authmiddleware, handlegetPosts);
router.get("/posts", authmiddleware, handlegetMainUserPosts);
router.post("/create-post", authmiddleware, handlePostPostreq);
router.get("/post/:id", authmiddleware, handleGetPostById);
router.put("/post/:id", authmiddleware, handlePutById);
router.delete("/post/:id", authmiddleware, handlePostDeleteById);

// router.get("/check", authmiddleware)

const prisma = new PrismaClient({
  datasourceUrl:
    "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZTU1MTU4MTItZTZhYy00NGMzLWFkNWYtOTllNjU1N2M2ODg4IiwidGVuYW50X2lkIjoiMGJjNjNmZDgyMDI1YzU2MjgyNWY0MzkzYzI4MjAwZmM3YzAzYjNlYTNjOTBlYWI1YWNkZDg1ZjU1YzZiNTc5ZCIsImludGVybmFsX3NlY3JldCI6IjJkYjY3OTQ4LWYzZTItNGU4OC1iZmQ3LWJhNDM1OTQ5OTRkNCJ9.kcjveZ1CXgF90LsODYTv8oNd5kOCtlLJEk0jI9FLahM",
}).$extends(withAccelerate());

router.get("/getuser/:id", authmiddleware, async (c: any) => {
  try {
    const res = await prisma.user.findFirst({
      where: {
        id: Number(c.req.param("id")),
      },
      include: {
        posts: true,
      },
    });

    if (res == null) {
      return c.body("user not found", 404);
    } else {
      return c.json({
        user: {
          id: res.id,
          username: res.username,
          email: res.email,
          posts: res.posts,
        },
      });
    }
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
});

router.get("/users", async (c: Context) => {
  try {
    const res = await prisma.user.findMany();
    return c.json({
      users: res.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
      })),
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
});

router.get("/getPost/:tag", authmiddleware, async (c: Context) => {
  try {
    const res = await prisma.tags.findMany({
      where: {
        tag: String(c.req.param("tag")),
      },
      include: {
        post: true,
      },
    });

    return c.json({
      data : res.map(post=>({
        posts: post.post,
        tagName: post.tag
      }))
    })
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
});
