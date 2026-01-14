import { useState } from "react";
import { fetchData } from "../../util/persistence";
import LoadState from "../common/LoadState.";
import { useOutletContext } from "react-router-dom";
import styles from "./AddQuestions.module.css";

const blankQuestion = { header: '', questionText: '', subject: '' };

export default function AddQuestion(){
const [question, setQuestion] = useState(blankQuestion);
const [loading, setLoading] = useState(false);
const { setStatusMessage, removeMessage } = useOutletContext();
 

const ApiURLregister = "http://127.0.0.1:7075/api/v1/questions";

const handleChange = (event) =>{
const value = event.target.value;
const name = event.target.id;

    setQuestion({...question, [name]: value});
}

async function saveNewQuestion(){
setLoading(true);
removeMessage();
     
try{
    console.log(question);
    const data = await fetchData(ApiURLregister, "POST", question, true);
 console.log(data);
       
       setStatusMessage(data.header + "With new id: " + data.id + " Have succesfully been created.");
    } catch (error) {
      console.error("Failed to save new question:", error.message);
      setStatusMessage(error.message);
  }
  finally {
      setLoading(false);
}
}


  return (
    <div>
      <LoadState loading={loading}>
        <div className={styles.card}>
          <h2 className={styles.title}>Add Question</h2>

          <div>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="subject"
              value={question.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="header">Header</label>
            <input
              id="header"
              type="text"
              placeholder="header"
              value={question.header}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="questionText">Question Body</label>
            <input
              id="questionText"
              type="text"
              placeholder="questionText"
              value={question.questionText}
              onChange={handleChange}
            />
          </div>

          <div>
            <button className={styles.submitBtn} onClick={saveNewQuestion}>
              Submit new question
            </button>
          </div>
        </div>
      </LoadState>
    </div>
  );
}