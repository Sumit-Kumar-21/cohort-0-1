const { PrismaClient }= require("@prisma/client") ;
const prisma = new PrismaClient();

// get all surveys
const handleGetAllSurvey = async (req, res) => {
  try {
    const response = await prisma.survey.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    res.status(200).json({
      surveys: response,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        msg: `internal server error: ${error}`,
      });
    }
  }
};

// create survey
const handlePostSurvey = async (req, res) => {
  const { title, questions } = req.body;

  try {
    const response = await prisma.survey.create({
      data: {
        title: title,
        questions: {
          create: questions.map((que) => ({
            que_text: que.que_text,
            options: {
              create: que.options.map((opt) => ({
                opt_text: opt.opt_text,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    res.status(200).json({
      msg: "survey created successfully",
      survey: response,
    });
  } catch (error) {
    if (error) {
      res.status(400).json({
        msg: `Bad request check the sent data: ${error}`,
      });
    }
  }
};

// get survey by id
const handleGetSurveyById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.survey.findUnique({
      where: {
        id,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    res.status(200).json({
      survey: response,
    });
  } catch (error) {
    if (error) {
      res.status(400).json({
        msg: `Bad request check the sent data: ${error}`,
      });
    }
  }
};

// update survey by id
const handleUpdateSurveyById = async (req, res) => {
  const { id } = req.params;
  const { title, questions } = req.body;

  try {
    const response = await prisma.survey.update({
      where: { id },
      data: {
        title,
        questions: {
          deleteMany: {},
          create: questions.map((que) => ({
            que_text: que.que_text,
            options: {
              create: que.options.map((opt) => ({
                opt_text: opt.opt_text,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    res.status(200).json({
      msg: "survey update successfully",
      survey: response,
    });
  } catch (error) {
    if (error) {
      res.status(400).json({
        msg: `Bad request check the sent data: ${error}`,
      });
    }
  }
};

// delete survey by id
const handleDeleteSurveyById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await prisma.survey.delete({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    res.status(200).json({
      msg: "survey deleted successfully",
      survey: response,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        msg: `internal server error: ${error}`,
      });
    }
  }
};

// vote the option
const handleVote = async (req, res) => {
  const { survey_id, questions } = req.body;

  try {
    const existingSurvey = await prisma.survey.findUnique({
      where: { id: survey_id },
    });
    if (!existingSurvey) {
      return res.status(404).json({ msg: "Survey not found" });
    }

    const surveyExist = await prisma.survey.findUnique({
      where: { id: survey_id },
    });
    if(!surveyExist){
      res.status(404).json({ msg: `Survey not found on this survey ID: ${survey_id}` });
    }

    for(const que of questions){
      for(const opt of que.options){

        const optionExist= await prisma.option.findUnique({
          where:{
            id: opt.id
          }
        });

        if(!optionExist || optionExist.question_id !== que.id){
          res.status(400).json({ msg: `Option not found or does not belong to the question: ${opt.id}` });
        }

        await prisma.option.update({
          where:{
            id: opt.id
          },
          data: {vote: {increment: 1}}
        })
      }
    }
    const response = await prisma.survey.findFirst({
      where:{
        id: survey_id
      },
      include:{
        questions:{
          include:{
            options: true
          }
        }
      }
    })

    res.status(200).json({ msg: "vote updated", optionVote: response });
    
  } catch (error) {
    res.status(500).json({ msg: `Internal server error: ${error}` });
  }
};


module.exports= {
  handleDeleteSurveyById,
  handleGetAllSurvey,
  handleGetSurveyById,
  handlePostSurvey,
  handleUpdateSurveyById,
  handleVote
}