// import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { checkInUser, checkUser } from "../zod/user";
import { Jwt } from "hono/utils/jwt";
import { Context } from "hono";

const JWT_TOKEN = "mytoken";
const prisma = new PrismaClient({
  datasourceUrl:
    "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNmZmN2VlNGMtNWE3NC00ZDg2LTgxMjctNDc1NWVmZGU4ZGYxIiwidGVuYW50X2lkIjoiM2Q4YTJjY2Y0NmIwMGQ1NjlmYzc1ZjA5MzZkZGZhNTg1MWFkOGQ3N2ZlMGI4NDBlMjcyYmFjZDRjZWM0OGU5ZSIsImludGVybmFsX3NlY3JldCI6ImZkNzgxMDJjLWFkNDUtNDIyNS05MGI1LTI0MDZmYWYyNjY1ZCJ9.0aSNcQRuDBBWYhjolk-zIP3tHzoy-QJlPzjUPvBC5tM",
}).$extends(withAccelerate());

export async function handleSignupPostreq(c: Context) {
  const body: {
    username: string;
    email: string;
    password: string;
  } = await c.req.json();

  console.log(body);

  const check = checkUser.safeParse(body);

  if (!check.success) {
    return c.json({
      msg: "you type wrong input pls fill valid input",
    });
  }

  const isUserExist = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (isUserExist) {
    return c.json({ msg: "email already exist" });
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
}

export async function handleSigninPostreq(c: Context) {
  // const JWT_TOKEN = "mytoken";

  const body: {
    email: string;
    password: string;
  } = await c.req.json();

  const check = checkInUser.safeParse(body);

  if (!check.success) {
    return c.json({ msg: "you type wrong input pls fill valid input" });
  }

  const isUserExist = await prisma.user.findFirst({
    where: { username: body.email },
  });

  if (isUserExist == null) {
    return c.json({ msg: "user doesn't exist pls signup first" });
  }

  const userId = isUserExist.id;

  const token = await Jwt.sign(userId, JWT_TOKEN);

  return c.json({
    message: "User logged-In successfully",
    token: token,
  });
}

export async function handlegetPosts(c: any) {

  const res =await prisma.posts.findMany({
    where:{
      userId: c.req.useId
    }
  });
  return c.json({
    posts: res,
  });
}

export async function handlegetUserPosts(c: any) {

  const res =await prisma.posts.findMany();
  return c.json({
    posts: res,
  });
}

export async function handlePostPostreq(c: any) {
  const body: {
    title: string;
    body: string;
  } = await c.req.json();

  const res = await prisma.posts.create({
    data: {
      title: body.title,
      body: body.body,
      userId: c.req.userId,
    },
  });

  return c.json({
    message: "Post successfully",
    postId: res.id,
  });
}

export async function handlePostById(c: any) {
  const id: number = Number(c.req.param("id"));

  const isPostExist = await prisma.posts.findFirst({
    where: {
      id: id,
      userId: c.req.useId,
    },
  });

  if (isPostExist == null) {
    return c.json({
      message: "no any post is present in this id",
    });
  }
  return c.json({
    data: {
      title: isPostExist.title,
      body: isPostExist.body,
    },
  });
}
export async function handlePutById(c: any) {
  const id: number = Number(c.req.param("id"));

  const body: {
    title?: string;
    body?: string;
  } = await c.req.json();

  const isPostExist = await prisma.posts.findFirst({
    where: {
      id: id,
      userId: c.req.userId
    },
  });

  if (isPostExist == null) {
    return c.json({
      message: "no any post is present in this id",
    });
  }

  const res = await prisma.posts.update({
    where: {
      id: id,
      userId: c.req.useId
    },
    data: {
      title: body.title,
      body: body.body,
    },
  });

  return c.json({
    data: {
      title: res.title,
      body: res.body,
    },
  });
}

export async function handlePostDeleteById(c: any) {
  const id: number = Number(c.req.param("id"));

  const isPostExist = await prisma.posts.findFirst({
    where: {
      id: id,
      userId: c.req.userId
    },
  });

  if (isPostExist == null) {
    return c.json({
      message: "no any post is present in this id",
    });
  }

  const res = await prisma.posts.delete({
    where: {
      id: id,
      userId: c.req.userId
    },
  });
  return c.json({
    message: "post deleted",
  });
}
