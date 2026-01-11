import { useState } from "react";
import { fetchData } from "../../util/persistence";
import LoadState from "../common/LoadState.";
// import facade from "../../apiFacade";

const blankQuestion = { header: '', questionText: '', subject: '' };

export default function AddQuestion(){
const [question, setQuestion] = useState(blankQuestion);
const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
 

const ApiURLregister = "http://127.0.0.1:7075/api/v1/questions";

const handleChange = (event) =>{
const value = event.target.value;
const name = event.target.id;

    setQuestion({...question, [name]: value});
}

async function saveNewQuestion(){
setLoading(true);
setStatusMessage("");
     
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

return(

    <div>
         {statusMessage && <p>{statusMessage}</p>}
         <LoadState loading={loading}>

<label htmlFor="subject">Subject:</label>
<input name="subject" id="subject" type="text" placeholder="subject"
value={question.subject} onChange={handleChange}/>

<label htmlFor="header">Header:</label>
<input name="header" id="header" type="text" placeholder="header"
 value={question.header} onChange={handleChange}/>
 
<label htmlFor="questionText">Question Body:</label>
<input name="questionText" id="questionText" type="text" placeholder="questionText"
value={question.questionText} onChange={handleChange}/>

   <button onClick={saveNewQuestion}>Submit new question</button>
   
   </LoadState>
    </div>
)
    

}