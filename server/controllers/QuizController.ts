import { Request, Response, json } from "express";
// const Quiz = require("../db/models/quizes");
const User = require("../db/models/auth")

//posta quiz
module.exports.quiz_post = async (req: Request, res: Response) => {
  // console.log('Post Quiz --> ', JSON.parse(req.body.data), typeof req.files)
  try {

    // (req.files as Array<Express.Multer.File>).map((file) =>{
    //   console.log('file ', file.path)
    // })

    const arr = ['hej', 'nej']
    let currentQuiz = JSON.parse(req.body.data) 
    
    const newQuiz = currentQuiz.questions.map((question: any) => {
    // const newQuiz = req.body.questions.map((question: any) => {
      // return (req.files as Array<Express.Multer.File>).forEach(file => question.image = file.path);
      // return arr.forEach((el) => question.image = el)
      return question.image = 'hej'
    })
    console.log('newQuiz ', newQuiz, req.body, JSON.parse(req.body.data).questions[0].image)
    // console.log('test image', JSON.parse(req.body.data).questions[0].image = 'hej')
    // console.log('test image', JSON.parse(req.body.data).questions[0].image )
    // const postedQuiz = await User.postQuiz(req.params.id, newQuiz);
    // res.status(201).json({msg: "Quiz was saved successfully", postedQuiz});
    res.status(201).json({ msg: "Quiz was saved successfully" });
  } catch (err: any) {
    res.status(400).json({ msg: "An error occurred when trying to save quiz" });
  }
};

// ändra scheam.img till string || uploadImgTtype (vilket kmr va ett objekt)
// när routen för create quiz triggas ska middleWare1 köras --> går igenom req.body 
//--> loopar igenom varje question objekt och tittar om imgage är string eller uploadImgTtype och sen skickar vidare t middleWare2/multer
//multer behöver skicka tillbaka nya namnet på bilden och denna ska den spara i rätt question.image

//delete quiz
module.exports.quiz_delete = async (req: Request, res: Response) => {
  try {
    await User.deleteQuiz(req.params.userId, req.params.quizId);
    res.status(201).json({ msg: "Quiz was deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ msg: "An error occurred when trying to delete quiz" });
  }
};

//get all quizes
module.exports.quiz_get = async (req: Request, res: Response) => {
  try {
    const allQuizes = await User.getQuiz(req.params.userId);
    res.status(201).json({ allQuizes: allQuizes });
  } catch (err: any) {
    res.status(400).json({ err });
  }
};
