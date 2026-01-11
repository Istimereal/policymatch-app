import QuestionList from "../QuestionList";
import QuestionForm from "../QuestionForm";
import { useState, useEffect } from "react";
import { fetchDataCall } from "../../util/persistenceCall";
import LoadState from "../common/LoadState.";

const blankQuestion = { id: '', subject: '', header: '', questionText: '' };

export default function ManageQuestions(){

    const [questions, setQuestions] = useState([]);
    const [questionToEdit, setQuestionToEdit] = useState(blankQuestion);
 const [statusMessage, setStatusMessage] = useState("");
 const [loading, setLoading] = useState(false);


    const ApiURLQuestions = "http://127.0.0.1:7075/api/v1/questions";

function handleError(msg) {
  
  setStatusMessage(msg);
   setLoading(false);

}

    useEffect(() =>{

  setLoading(true);
setStatusMessage("");
fetchDataCall(ApiURLQuestions, (data) => setQuestions(data), "GET", null, handleError, false);
    
  },[]);

function editQuestion(question){
    setQuestionToEdit(question)
}

function deleteQuestionById(questionId){

   fetchDataCall(`${ApiURLQuestions}/${questionId}`, 
    () => {setQuestions(prev => prev.filter(q => q.id != questionId));
        setStatusMessage( `Question ${questionId} have been deleted`);
    }, 'DELETE', null, true, handleError 
); 
}

function updateQuestion(question){

console.log("update");
fetchDataCall(`${ApiURLQuestions}/${question.id}`,
  () => setQuestions(prev => prev.map(q => q.id == question.id ? {...question} : q)), 
    'PATCH', question, true, handleError
);

}

return (

    <div>
<h1>Manage Questions</h1>
<LoadState loading={loading}>
{statusMessage && <p>{statusMessage}</p>}
<QuestionForm blankQuestion={blankQuestion}
questionToEdit={questionToEdit} onSubmit={updateQuestion}/>
<QuestionList questions={questions} deleteQuestionById={deleteQuestionById}
editQuestion={editQuestion} />
</LoadState>
    </div>
);
}
