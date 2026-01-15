import QuestionList from "../QuestionList";
import QuestionForm from "../QuestionForm";
import { useState, useEffect } from "react";
import { fetchDataCall } from "../../util/persistenceCall";
import LoadState from "../common/LoadState.";
import { useOutletContext } from "react-router-dom";
import styles from "./ManageQuestions.module.css";

const blankQuestion = { id: '', subject: '', header: '', questionText: '' };

export default function ManageQuestions(){

    const [questions, setQuestions] = useState([]);
    const [questionToEdit, setQuestionToEdit] = useState(blankQuestion);
    const [loading, setLoading] = useState(false);

    const { setStatusMessage, removeMessage } = useOutletContext();

    const ApiURLQuestions = "http://127.0.0.1:7075/api/v1/questions";

function handleError(msg) {
  
  setStatusMessage(msg);
   setLoading(false);

}

    useEffect(() =>{

  setLoading(true);
  removeMessage();

fetchDataCall(ApiURLQuestions, 
    (data) => { setQuestions(data); setLoading(false); },
      "GET", false, handleError, null);
    },[removeMessage]);

function editQuestion(question){
    setQuestionToEdit(question)
}

function deleteQuestionById(questionId){
setLoading(true);
   fetchDataCall(`${ApiURLQuestions}/${questionId}`, 
    () => {
        setQuestions(prev => prev.filter(q => q.id != questionId));
        setStatusMessage( `Question ${questionId} have been deleted`);
        setLoading(false);
    }, 
    'DELETE', true, handleError, null 
); 

}

function setStatusWithDetails(baseMsg, ...details) {
    setStatusMessage(baseMsg + " " + details.join(" - "));
  }

function updateQuestion(question){
setLoading(true);
console.log("update");
fetchDataCall(`${ApiURLQuestions}/${question.id}`,
  () => { setQuestions(prev => prev.map(q => q.id == question.id ? {...question} : q)); 
  setStatusWithDetails("Update OK:", question.id, question.subject);
  setLoading(false);
}
  , 'PATCH', true, handleError, question
);

}

return (
  <div>
    <h1 className={styles.title}>Manage Questions</h1>

    <LoadState loading={loading}>
      <div>
        <section className={styles.card}>
          <QuestionForm
            blankQuestion={blankQuestion}
            questionToEdit={questionToEdit}
            onSubmit={updateQuestion}
          />
        </section>

        <section className={styles.card}>
          <QuestionList
            questions={questions}
            deleteQuestionById={deleteQuestionById}
            editQuestion={editQuestion}
          />
        </section>
      </div>
    </LoadState>
  </div>
);
}
