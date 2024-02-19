// import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { checkInUser, checkUser } from "../zod/user";
import { Jwt } from "hono/utils/jwt";
import { Context } from "hono";

enum StatusCode{
  BADREQ= 400,
  NOTFOUND= 404,
  NOTPERMISSIOON=403
}

const JWT_TOKEN = "mytoken";
const prisma = new PrismaClient({
  datasourceUrl:
    "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNmZmN2VlNGMtNWE3NC00ZDg2LTgxMjctNDc1NWVmZGU4ZGYxIiwidGVuYW50X2lkIjoiM2Q4YTJjY2Y0NmIwMGQ1NjlmYzc1ZjA5MzZkZGZhNTg1MWFkOGQ3N2ZlMGI4NDBlMjcyYmFjZDRjZWM0OGU5ZSIsImludGVybmFsX3NlY3JldCI6ImZkNzgxMDJjLWFkNDUtNDIyNS05MGI1LTI0MDZmYWYyNjY1ZCJ9.0aSNcQRuDBBWYhjolk-zIP3tHzoy-QJlPzjUPvBC5tM",
}).$extends(withAccelerate());


// this controller controll signup request
export async function handleSignupPostreq(c: Context) {
  const body: {
    username: string;
    email: string;
    password: string;
  } = await c.req.json();

  console.log(body);

  const check = checkUser.safeParse(body);

  if (!check.success) {
    return c.body('input are invalid pls enter valid info', StatusCode.BADREQ);
  }

  const isUserExist = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (isUserExist) {
    return c.body('email already exist', StatusCode.BADREQ);
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


// this controller control signin request
export async function handleSigninPostreq(c: Context) {

  const body: {
    email: string;
    password: string;
  } = await c.req.json();

  const check = checkInUser.safeParse(body);

  if (!check.success) {
    return c.body('input are invalid pls enter valid info', StatusCode.BADREQ);
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
}


// this controller send all the posts 
export async function handlegetPosts(c: any) {
  const res = await prisma.posts.findMany();
  return c.json({
    posts: res,
  });
}


//this controller send only user posts
export async function handlegetUserPosts(c: any) {
  
  const res = await prisma.posts.findMany({
    where: {
      userId: c.req.userId,
    },
  });
  return c.json({
    posts: res,
  });
}


// this controller create new post
export async function handlePostPostreq(c: any) {
  const body: {
    title: string;
    body: string;
  } = await c.req.json();
  
  if((body.body && body.title)==null){
    return c.body("title and body should not be blank", StatusCode.BADREQ)
  }
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


// this controller send the specific post 
export async function handleGetPostById(c: any) {
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
  return c.json({
    data: {
      title: isPostExist.title,
      body: isPostExist.body,
    },
  });
}


// this controller update the specific post
export async function handlePutById(c: any) {
  const id: number = Number(c.req.param("id"));

  const body: {
    title: string;
    body: string;
  } = await c.req.json();

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
    },
  });

  return c.json({
    data: {
      title: res.title,
      body: res.body,
    },
  });
}


// this controller delete the specific post
export async function handlePostDeleteById(c: any) {
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
}
