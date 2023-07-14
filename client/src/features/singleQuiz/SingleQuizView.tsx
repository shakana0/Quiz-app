import { useEffect, useState } from "react";
import { SingleQuizViewStyling } from "../../components/styles/SingleQuiz.styled";
import { useNavigate } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setCurrentQuiz, setDeletedQuiz } from "./QuizSlice";
import { FlashCards } from "./games/FlashCards";
import { Write } from "./games/Write";
import { Match } from "./games/Match";
import ConfirmDeletionDialog from "../confirmDeletionDialog/confirmDeletionDialog";
import { deleteQuiz } from "../../api/quizApi";
import { setIsLoading } from "../Modal/AuthSlice";

export const SingleQuizView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentQuiz } = useSelector((state: any) => state.quiz);
  const { activeUser } = useSelector((state: any) => state.auth);
  const { id }: any = useParams();
  const [currentGame, setCurrentGame] = useState("");
  const [isConfirmDeletionDialogOpen, setIsConfirmDeletionDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    let quiz: any = {};
    if (activeUser.quizes != null) {
      quiz = activeUser.quizes.filter((quiz: any) => quiz.id === id);
      dispatch(setCurrentQuiz(quiz[0]));
    }
  }, []);

 const handleConfirmation =async () => {
    // const res = await deleteQuiz("fhhf", "id");
    const res = await deleteQuiz(activeUser._id, id);
    dispatch(setDeletedQuiz({msg: res?.data?.msg, status: res?.status}))
    setIsConfirmDeletionDialogOpen(false);
    dispatch(setIsLoading(true));
    navigate("/");
  };

  const renderQuiz = () => {
    if (currentGame === "FlashCards") {
      return <FlashCards />;
    }
    if (currentGame === "Write") {
      return <Write />;
    }
    if (currentGame === "Match") {
      return <Match />;
    } else {
      return <FlashCards />;
    }
  };

  return (
    <SingleQuizViewStyling>
      <ConfirmDeletionDialog
        open={isConfirmDeletionDialogOpen}
        onCancel={() => {
          setIsConfirmDeletionDialogOpen(false);
        }}
        onConfirm={() => {
          handleConfirmation();
        }}
      />
      <section className="top">
        <button
          className="back-btn"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <ArrowBackIosRoundedIcon className="back-icon" />
          <h3>Back</h3>
        </button>
        <DeleteOutlineOutlinedIcon
          className={"delete-icon"}
          onClick={() => setIsConfirmDeletionDialogOpen(true)}
        />
      </section>
      <h1>{currentQuiz.titel}</h1>
      <p className="description">{currentQuiz.description}</p>
      <section className="game-board">
        <div className="quiz-btns">
          <p>Pick a study mode!</p>
          <button
            onClick={() => {
              setCurrentGame("Flashcards");
            }}
          >
            Flashcards
          </button>
          <button
            onClick={() => {
              setCurrentGame("Write");
            }}
          >
            Write
          </button>
          <button
            onClick={() => {
              setCurrentGame("Match");
            }}
          >
            Match
          </button>
        </div>
        {renderQuiz()}
      </section>
      <img
        src={require("../../assets/img/astronaut-going-up.png")}
        alt="astronaut going up with a balloon"
        width={350}
        height={360}
      />
    </SingleQuizViewStyling>
  );
};
