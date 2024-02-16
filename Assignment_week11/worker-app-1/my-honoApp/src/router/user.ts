import { Hono } from "hono";
import { handlePostById, handlePostDeleteById, handlePostPostreq, handlePutById, handleSigninPostreq, handleSignupPostreq, handlegetUserPosts } from "../controller/user";
import { authmiddleware } from "../middleware/user";

export const router = new Hono();

router.post("/signup", handleSignupPostreq)
router.post("/signin", handleSigninPostreq)
router.get("/posts", authmiddleware ,handlegetUserPosts)
router.post("/post", authmiddleware, handlePostPostreq)
router.get("/post/:id", authmiddleware, handlePostById)
router.put("/post/:id", authmiddleware, handlePutById)
router.delete("/post/:id", authmiddleware, handlePostDeleteById)

