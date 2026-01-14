import { useState } from "react";
import { fetchData } from "../../util/persistence";
import LoadState from "../common/LoadState.";
import styles from "./PolicyMatch.module.css";
import { useOutletContext } from "react-router-dom";

export default function PolicyMatch(){
const [evaluation, setEvaluation] = useState(null);
const [loading, setLoading] = useState(false);

const { setStatusMessage, removeMessage } = useOutletContext();

const ApiURLresponses = "http://127.0.0.1:7075/api/v1/responses";

 async function getPolicymatch() {
   setLoading(true);
  removeMessage();
    try{
      setStatusMessage(
        "An evaluation can take arround a minute. Please be patient. You can always request new evaluations with your current responses. "
      );
       
    const data = await fetchData(ApiURLresponses, "GET", null, true);
     
       setEvaluation(data);
    } catch (error) {
      console.error("Failed to get evaluation:", error.message);
      setStatusMessage(error.message);
  }
  finally {
    setLoading(false);
  }
  }

  function getResultClass() {
  if (!evaluation) return styles.base;

  if (evaluation.party === "Enhedslisten" ||
     evaluation.party === "Socialistisk Folkeparti" || 
     evaluation.party === "Social Demokratiet" ) {
      return styles.leftFlank; }
 
    if (evaluation.party === "Venstre" || 
      evaluation.party === "Liberal Alliance" || 
      evaluation.party === "Konservativte" ) { 
        return styles.rightFlank; }

  return styles.base;
}

    return (
      <div>
<LoadState loading={loading}>
  <button onClick={getPolicymatch}>See Policy match</button>

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

