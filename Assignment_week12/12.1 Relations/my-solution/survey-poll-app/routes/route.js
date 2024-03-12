const { handleDeleteSurveyById, handleGetAllSurvey, handleGetSurveyById, handlePostSurvey, handleUpdateSurveyById, handleVote } = require("../controller");

const express = require("express")

const router = express.Router();

router.get("/", handleGetAllSurvey)
router.post("/create", handlePostSurvey)
router.get("/:id", handleGetSurveyById)
router.put("/:id", handleUpdateSurveyById)
router.delete("/:id", handleDeleteSurveyById)

router.post("/vote", handleVote)

module.exports = {router}