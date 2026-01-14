import { useEffect, useState } from "react";
import { fetchData } from "../../util/persistence";
import LoadState from "../common/LoadState.";
import { useOutletContext } from "react-router-dom";
import styles from "./DisplayQuestions.module.css";

function QuestionView({ currentQ }) {
  if (!currentQ) return null;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Question</td>
            <td>{currentQ.id}</td>
          </tr>
        </tbody>
      </table>

      <h3>{currentQ.subject}</h3>
      <h4>{currentQ.header}</h4>
      <p>{currentQ.questionText}</p>
    </div>
  );
}

function ResponseButtons({ onSetResponse }) {
  return (
    <>
      <h3>Response</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <button onClick={() => onSetResponse("AGREE")}>Agree</button>
              <button onClick={() => onSetResponse("DISAGREE")}>DisAgree</button>
              <button onClick={() => onSetResponse("NEUTRAL")}>Neutral</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function ImportanceButtons({ onSetImportance }) {
  return (
    <>
      <h3>Importance</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <button onClick={() => onSetImportance("HIGH")}>High</button>
              <button onClick={() => onSetImportance("LOW")}>Low</button>
              <button onClick={() => onSetImportance("MEDIUM")}>Medium</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function HandleUIInputs({ onBack, onNext, onSubmit }) {
  return (
    <div className={styles.btnRow}>
      <button type="button" onClick={onBack}>Back</button>
      <button type="button" onClick={onNext}>Next</button>
      <button type="button" onClick={onSubmit}>Submit</button>
    </div>
  );
}


export default function DisplayQuestions(){

    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const { setStatusMessage, removeMessage } = useOutletContext();
    

    const currentQ = questions[index];

    const ApiURLQuestions = "http://127.0.0.1:7075/api/v1/questions";
    const ApiURLResponses = "http://127.0.0.1:7075/api/v1/responses"

   useEffect(() =>{
      async function getQuestions() {
    
    setLoading(true);
    removeMessage();
  
    try {
      const data = await fetchData(ApiURLQuestions , "GET", null, false);
      setQuestions(data);
      setResponses(
        data.map(q => ({
          questionId: q.id,
          response: "NEUTRAL",
          importance: "MEDIUM",
        }))
      );
    } catch (error) {
      console.error("Failed to load questions:", error.message);
      setStatusMessage(error.message);
      // "Failed to display questions. Please try again later"
  }
  finally {
      setLoading(false);
    }
  }
  getQuestions();
  },[removeMessage, setStatusMessage]);
/*
  function showVanillaMSG(msg) {
 document.getElementById("vanillamsg").textContent = msg;
  
}  */

function showVanillaMSG(msg) {
  const el = document.getElementById("vanillamsg");
  if (el) el.textContent = msg;
}

  function setResponseForCurrentQuestion(newResponse) {
  const questionId = currentQ.id;

  const updated = responses.map(r => {
    if (r.questionId === questionId) {
      return { ...r, response: newResponse };
    }
    return r;
  });
  setResponses(updated);
  }

  function setImportanceForCurrentQuestion(newImportance) {
  const questionId = currentQ.id;

  const updated = responses.map(r => {
    if (r.questionId === questionId) {
      return { ...r, importance: newImportance };
    }
    return r;
  });
  setResponses(updated);
}

 function nextQuestion() {
    if (index < questions.length -1) {
      setIndex(index + 1);
    }
  }

   function backQuestion() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  async function postResponses() {
 setLoading(true);
 removeMessage(); 
    try {
      console.log(responses);
   const result = await fetchData(ApiURLResponses, "POST", responses, true);
      console.log("POST OK:", result);
      setStatusMessage(result.msg);
      showVanillaMSG(result.msg);
      
    } catch (error) {
      console.error("Failed to POST responses:", error.message);
       setStatusMessage(error.message);
      
  }
  }

  return (

<div>
    <LoadState loading={loading}>
      <div>
        <section className={styles.question}>
          <QuestionView currentQ={currentQ} />
        </section>

        {currentQ && (
          <section className={styles.controls}>
            <div>
              <ResponseButtons onSetResponse={setResponseForCurrentQuestion} />
            </div>

            <div>
              <ImportanceButtons onSetImportance={setImportanceForCurrentQuestion} />
            </div>

            <div>
              <HandleUIInputs onBack={backQuestion} onNext={nextQuestion} onSubmit={postResponses} />
            </div>
          </section>
        )}
      </div>

      <p id="vanillamsg" className={styles.msg}></p>
    </LoadState>
  </div>
     );
     
}

