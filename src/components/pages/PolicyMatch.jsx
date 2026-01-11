import { useState } from "react";
import { fetchData } from "../../util/persistence";
import LoadState from "../common/LoadState.";
import styles from "./PolicyMatch.module.css";

export default function PolicyMatch(){
        const [evaluation, setEvaluation] = useState(null);
const [statusMessage, setStatusMessage] = useState("");
const [loading, setLoading] = useState(false);

const ApiURLresponses = "http://127.0.0.1:7075/api/v1/responses";

 async function getPolicymatch() {
   setLoading(true);
  setStatusMessage("");
    try{
       const data = await fetchData(ApiURLresponses, "GET", null, true);
       setEvaluation(data);
    } catch (error) {
      console.error("Failed to get evaluation:", error.message);
      setStatusMessage(error.message);
  }
  }

  function getResultClass() {
  if (!evaluation) return styles.base;

  if (evaluation.party === "RED") return styles.leftFlank;
  if (evaluation.party === "BLUE") return styles.rightFlank;

  return styles.base;
}

    return (
      <div>
<LoadState loading={loading}>
  <button onClick={getPolicymatch}>See Policy match</button>
  {statusMessage && <p>{statusMessage}</p>}
   
   {evaluation && (
   <div className={getResultClass()}>
     <h3>AI evaluation</h3>
<table>
         
        <tbody>
        <tr>
        <td>Party evaluation:</td>
        <td>{evaluation.party}</td>
       </tr>
       <tr>
        <td>Party match persentage:</td>
        <td>{evaluation.matchPercentage}%</td>
       </tr>
        <tr>
        <td>2nd best party match:</td>
        <td>{evaluation.secondParty}</td>
       </tr>
         <tr>
        <td>Worst party match:</td>
        <td>{evaluation.worstMatch}</td>
       </tr>
       
        </tbody>
        </table>
   
   </div>
   )}
</LoadState>
  </div>
     );
}

