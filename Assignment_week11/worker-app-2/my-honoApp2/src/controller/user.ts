// import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { checkInUser, checkUser } from "../zod/user";
import { Jwt } from "hono/utils/jwt";
import { Context } from "hono";

enum StatusCode {
  BADREQ = 400,
  NOTFOUND = 404,
  NOTPERMISSIOON = 403,
}

const JWT_TOKEN = "mytoken";
const prisma = new PrismaClient({
  datasourceUrl:
    "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZTU1MTU4MTItZTZhYy00NGMzLWFkNWYtOTllNjU1N2M2ODg4IiwidGVuYW50X2lkIjoiMGJjNjNmZDgyMDI1YzU2MjgyNWY0MzkzYzI4MjAwZmM3YzAzYjNlYTNjOTBlYWI1YWNkZDg1ZjU1YzZiNTc5ZCIsImludGVybmFsX3NlY3JldCI6IjJkYjY3OTQ4LWYzZTItNGU4OC1iZmQ3LWJhNDM1OTQ5OTRkNCJ9.kcjveZ1CXgF90LsODYTv8oNd5kOCtlLJEk0jI9FLahM",
}).$extends(withAccelerate());

// this controller controll signup request
export async function handleSignupPostreq(c: Context) {
  try {
    const body: {
      username: string;
      email: string;
      password: string;
    } = await c.req.json();

    console.log(body);

    const check = checkUser.safeParse(body);

    if (!check.success) {
      return c.body(
        "input are invalid pls enter valid info",
        StatusCode.BADREQ
      );
    }

    const isUserExist = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (isUserExist) {
      return c.body("email already exist", StatusCode.BADREQ);
    }

    const res = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const userId = res.id;

    const token = await Jwt.sign(userId, JWT_TOKEN);

    return c.json({ msg: "User created successfully", token: token });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller control signin request
export async function handleSigninPostreq(c: Context) {
  try {
    const body: {
      email: string;
      password: string;
    } = await c.req.json();

    const check = checkInUser.safeParse(body);

    if (!check.success) {
      return c.body(
        "input are invalid pls enter valid info",
        StatusCode.BADREQ
      );
    }

    const isUserExist = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (isUserExist == null) {
      return c.body("user doesn't exist pls signup first", StatusCode.BADREQ);
    }

    const userId = isUserExist.id;

    const token = await Jwt.sign(userId, JWT_TOKEN);

    return c.json({
      message: "User logged-In successfully",
      token: token,
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller send all the posts
export async function handlegetPosts(c: any) {
  try {
    const resp = await prisma.posts.findMany({
      include: {
        tags: true,
        User: true,
      },
    });
    return c.json({
      post: resp.map((res) => ({
        username: res.User.username,
        userId: res.id,
        title: res.title,
        body: res.body,
        tags: res.tags,
      })),
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

//this controller send only user posts
export async function handlegetMainUserPosts(c: any) {
  try {
    const resp = await prisma.user.findMany({
      where: {
        id: c.req.userId,
      },
      include: {
        posts: {
          include: {
            tags: true,
          },
        },
      },
    });
    return c.json({
      post: resp.map((res) => ({
        username: res.username,
        posts: res.posts,
      })),
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller create new post
export async function handlePostPostreq(c: any) {
  try {
    const body: {
      title: string;
      body: string;
      tags: string;
    } = await c.req.json();

    const tagNames = body.tags.split(",").map((tag) => tag.trim());

    if ((body.body && body.title) == null) {
      return c.body("title and body should not be blank", StatusCode.BADREQ);
    }
    const res = await prisma.posts.create({
      data: {
        title: body.title,
        body: body.body,
        userId: c.req.userId,
        tags: {
          connectOrCreate: tagNames.map((tag) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return c.json({
      message: "Post successfully",
      post: {
        id: res.id,
        title: res.title,
        body: res.body,
        tags: res.tags.map(tag=> tag.tag)
      }
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller send the specific post
export async function handleGetPostById(c: any) {
  try {
    const id: number = Number(c.req.param("id"));

    const isPostExist = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.req.userId,
      },
      include: {
        tags: true,
      },
    });

    if (isPostExist == null) {
      return c.body("no any post is present in this id", StatusCode.NOTFOUND);
    }
    return c.json({
      data: {
        title: isPostExist.title,
        body: isPostExist.body,
        tags: isPostExist.tags,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller update the specific post
export async function handlePutById(c: any) {
  try {
    const id: number = Number(c.req.param("id"));

    const body: {
      title: string;
      body: string;
      tags: string;
    } = await c.req.json();

    const tagNames = body.tags.split(",").map((tag) => tag.trim());

    const isPostExist = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.req.userId,
      },
    });

    if (isPostExist == null) {
      return c.body("no any post is present in this id", StatusCode.NOTFOUND);
    }

    const res = await prisma.posts.update({
      where: {
        id: id,
        userId: c.req.useId,
      },
      data: {
        title: body.title,
        body: body.body,
        tags: {
          connectOrCreate: tagNames.map((tag) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return c.json({
      data: {
        title: res.title,
        body: res.body,
        tags: res.tags,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

// this controller delete the specific post
export async function handlePostDeleteById(c: any) {
  try {
    const id: number = Number(c.req.param("id"));

    const isPostExist = await prisma.posts.findFirst({
      where: {
        id: id,
        userId: c.req.userId,
      },
    });

    if (isPostExist == null) {
      return c.body("no any post is present in this id", StatusCode.NOTFOUND);
    }

    const res = await prisma.posts.delete({
      where: {
        id: id,
        userId: c.req.userId,
      },
    });
    return c.json({
      message: "post deleted",
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}
