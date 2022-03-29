import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { surveySlice } from "../store/surveySlice";
import { Button, InputGroup, InputGroupText, Input } from "reactstrap";

function SingleSelect() {
  const { surveyId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [options, setOptions] = useState(["", ""]);
  const [question, setQuestion] = useState("");

  const setOptionInArray = (value, optionIdx) => {
    options[optionIdx] = value;
    setOptions([...options]);
  };

  const isQuestionAddPublishDisabled = () =>
    question.trim() === "" ||
    options.find((opt) => opt.trim() === "") !== undefined;

  const addQuestionClickAction = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "single",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/create/" + surveyId + "?clear=true");
  };

  const publishQuestion = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "single",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/confirm/" + surveyId);
  };

  return (
    <div className="question-container">
      <InputGroup className="input-grp">
        <InputGroupText>?</InputGroupText>

        <Input
          placeholder="Your Question"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
      </InputGroup>
      <p className="options-text">Options</p>
      <InputGroup className="input-grp">
        <Input
          placeholder="Option 1"
          value={options[0]}
          onChange={(e) => setOptionInArray(e.target.value, 0)}
        />

        <InputGroupText>+</InputGroupText>
        <InputGroupText>-</InputGroupText>
      </InputGroup>
      <InputGroup className="input-grp">
        <Input
          placeholder="Option 2"
          value={options[1]}
          onChange={(e) => setOptionInArray(e.target.value, 1)}
        />

        <InputGroupText>+</InputGroupText>
        <InputGroupText>-</InputGroupText>
      </InputGroup>
      <div className="question-buttons">
        <Button
          className="survey-main-btn"
          disabled={isQuestionAddPublishDisabled()}
          onClick={addQuestionClickAction}
        >
          Add Question
        </Button>
        <Button
          className="survey-main-btn"
          disabled={isQuestionAddPublishDisabled()}
          onClick={publishQuestion}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}

export default SingleSelect;
