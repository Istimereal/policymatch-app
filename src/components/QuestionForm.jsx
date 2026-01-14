import { useState, useEffect } from "react";

export default function QuestionForm({questionToEdit, onSubmit}){

    const [question, setQuestion] = useState({...questionToEdit});
 
    useEffect(() => { setQuestion(questionToEdit);}, [questionToEdit]);

    function handleChange(event){
const value = event.target.value;
const name = event.target.id;

setQuestion({...question, [name]: value});
    }

    function handleSubmit(event){
        event.preventDefault();
        alert("submit", question);
        onSubmit(question);
    }  

  return (

    <div>
   <h1>Edit question</h1>

    <form onSubmit={handleSubmit}>
    <label htmlFor="id">Id</label>
    <input name="id" id="id" type="number" readOnly placeholder="id" value={question.id} onChange={handleChange} />

   <label htmlFor="subject">Subject:</label>
<input name="subject" id="subject" type="text" placeholder={question.subject}
 value={question.subject} onChange={handleChange}/>
 
 <label htmlFor="header">Header:</label>
<input name="header" id="header" type="text" placeholder={question.header}
value={question.header} onChange={handleChange}/>

<label htmlFor="questionText">Question Body:</label>
<input name="questionText" id="questionText" type="text" placeholder={question.questionText}
value={question.questionText} onChange={handleChange}/>

<button type="submit" onClick={() => questionToEdit}>Update</button>
</form>
 
    </div>
  )
     
}