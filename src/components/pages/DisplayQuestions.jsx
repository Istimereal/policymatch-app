import { useEffect, useState } from "react";
import { fetchData } from "../../util/persistence";
import LoadState from "../common/LoadState.";


export default function DisplayQuestions(){

    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const currentQ = questions[index];

    const ApiURLQuestions = "http://127.0.0.1:7075/api/v1/questions";
    const ApiURLResponses = "http://127.0.0.1:7075/api/v1/responses"

   useEffect(() =>{
      async function getQuestions() {
    
    setLoading(true);
    setStatusMessage("");
  
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
  },[]);

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

    try {
      console.log(responses);
   const result = await fetchData(ApiURLResponses, "POST", responses, true);
      console.log("POST OK:", result);
      setStatusMessage(result.msg);
      
    } catch (error) {
      console.error("Failed to POST responses:", error.message);
       setStatusMessage(error.message);
  }
  }

  return (

    <div>
<LoadState loading={loading}>
{currentQ && (

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
)}

<h3>Response</h3>
 <table>
        <tbody>
          <tr>
        <td>

 <button onClick={() => setResponseForCurrentQuestion("AGREE")}>Agree</button>
  <button  onClick={() => setResponseForCurrentQuestion("DISAGREE")}>DisAgree</button>
   <button onClick={() => setResponseForCurrentQuestion("NEUTRAL")}>Neutral</button>
        </td>
        </tr>
        </tbody>
   </table>
   <h3>Importance</h3>
   <table>
        <tbody>
          <tr>
        <td>
   
    <button onClick={() => setImportanceForCurrentQuestion("HIGH")}>High</button>
  <button  onClick={() => setImportanceForCurrentQuestion("LOW")}>Low</button>
   <button onClick={() => setImportanceForCurrentQuestion("MEDIUM")}>Medium</button>
        </td>
        </tr>
        </tbody>
   </table>
   <table>
    <tbody>
  <tr>
    <td>
  <button onClick={backQuestion}>Back</button>
  
  <button  onClick={nextQuestion}>Next</button>
  <button onClick={postResponses}>Submit</button>
</td>
  </tr>
  </tbody>
  </table>
   </LoadState>
   {statusMessage && <p>{statusMessage}</p>}
    </div>
  
     );
     
}
