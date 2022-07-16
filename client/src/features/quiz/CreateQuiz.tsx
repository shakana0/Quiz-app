import React from "react";
import { CreateQuizStyling } from "../../components/styles/CreateQuiz.styled";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { AuthBtn } from "../buttons/AuthBtn";

export const CreateQuiz = () => {
  return (
    <CreateQuizStyling>
      <form action="">
        <section className="quiz-info">
          <div>
            <h1>Create a new quiz</h1>
            <input
              type="text"
              placeholder="Enter a title like “Chemistry -chapter 2”"
            />
            <input type="text" placeholder="Add a description..." />
          </div>
          <img
            src={require("../../assets/img/astronaut-on-computer2.png")}
            alt="astronaut on computer"
            width={350}
            height={360}
          />
        </section>
        <section className="card-section">
          <div className="quiz-card">
            <div className="top">
              <input type="text" placeholder="Enter Term..." />
              <div>
                <button className="add-file-btn">Upload Image</button>
                <DeleteOutlineOutlinedIcon className="delete-icon" />
              </div>
            </div>
            <input type="text" placeholder="Enter Definition..." />
          </div>
          <button className="add-card-btn">+ Add Another Card</button>
        </section>
        <AuthBtn
          className="create-btn"
          variant="tertiary"
          isFullWidth={true}
          btnText="Create"
        />
      </form>
    </CreateQuizStyling>
  );
};
