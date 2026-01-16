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

export default function DisplayQuestions() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setStatusMessage, removeMessage } = useOutletContext();

  const currentQ = questions[index];

  const ApiURLQuestions = "/api/v1/questions";
  const ApiURLResponses = "/api/v1/responses";

  useEffect(() => {
    async function getQuestions() {
      setLoading(true);
      removeMessage();

      try {
        const data = await fetchData(ApiURLQuestions, "GET", null, false);
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
      } finally {
        setLoading(false);
      }
    }

    getQuestions();
  }, [removeMessage, setStatusMessage]);

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
    if (index < questions.length - 1) {
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <LoadState loading={loading}>
        <div className={styles.grid}>
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

/* displayQuestions.vanilla.js

const ApiURLQuestions = "http://127.0.0.1:7075/api/v1/questions";
const ApiURLResponses = "http://127.0.0.1:7075/api/v1/responses";

const state = {
  questions: [],
  index: 0,
  responses: [],
  loading: false,
};

function setLoading(isLoading) {
  state.loading = isLoading;
  render();
}

function setMessage(msg) {
  const el = document.getElementById("vanillamsg");
  if (el) el.textContent = msg ?? "";
}

async function fetchData(url, method = "GET", body = null, sendJson = false) {
  const options = { method, headers: {} };

  if (body != null) {
    options.body = sendJson ? JSON.stringify(body) : body;
    if (sendJson) options.headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, options);

 
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }


  return await res.json();
}

function getCurrentQ() {
  return state.questions[state.index] ?? null;
}

function setResponseForCurrentQuestion(newResponse) {
  const currentQ = getCurrentQ();
  if (!currentQ) return;

  const questionId = currentQ.id;
  state.responses = state.responses.map(r =>
    r.questionId === questionId ? { ...r, response: newResponse } : r
  );

  render(); // for at kunne vise evt. valgt state senere
}

function setImportanceForCurrentQuestion(newImportance) {
  const currentQ = getCurrentQ();
  if (!currentQ) return;

  const questionId = currentQ.id;
  state.responses = state.responses.map(r =>
    r.questionId === questionId ? { ...r, importance: newImportance } : r
  );

  render();
}

function nextQuestion() {
  if (state.index < state.questions.length - 1) {
    state.index += 1;
    render();
  }
}

function backQuestion() {
  if (state.index > 0) {
    state.index -= 1;
    render();
  }
}

async function postResponses() {
  setLoading(true);
  setMessage("");

  try {
    const result = await fetchData(ApiURLResponses, "POST", state.responses, true);
    setMessage(result.msg ?? "POST OK");
  } catch (err) {
    setMessage(err.message);
  } finally {
    setLoading(false);
  }
}

function createQuestionView(currentQ) {
  const wrap = document.createElement("div");

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  td1.textContent = "Question";
  const td2 = document.createElement("td");
  td2.textContent = currentQ.id;

  tr.append(td1, td2);
  tbody.append(tr);
  table.append(tbody);

  const h3 = document.createElement("h3");
  h3.textContent = currentQ.subject;

  const h4 = document.createElement("h4");
  h4.textContent = currentQ.header;

  const p = document.createElement("p");
  p.textContent = currentQ.questionText;

  wrap.append(table, h3, h4, p);
  return wrap;
}

function createResponseButtons() {
  const wrap = document.createElement("div");

  const h3 = document.createElement("h3");
  h3.textContent = "Response";

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");
  const td = document.createElement("td");

  const btnAgree = document.createElement("button");
  btnAgree.textContent = "Agree";
  btnAgree.addEventListener("click", () => setResponseForCurrentQuestion("AGREE"));

  const btnDisagree = document.createElement("button");
  btnDisagree.textContent = "DisAgree";
  btnDisagree.addEventListener("click", () => setResponseForCurrentQuestion("DISAGREE"));

  const btnNeutral = document.createElement("button");
  btnNeutral.textContent = "Neutral";
  btnNeutral.addEventListener("click", () => setResponseForCurrentQuestion("NEUTRAL"));

  td.append(btnAgree, btnDisagree, btnNeutral);
  tr.append(td);
  tbody.append(tr);
  table.append(tbody);

  wrap.append(h3, table);
  return wrap;
}

function createImportanceButtons() {
  const wrap = document.createElement("div");

  const h3 = document.createElement("h3");
  h3.textContent = "Importance";

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");
  const td = document.createElement("td");

  const btnHigh = document.createElement("button");
  btnHigh.textContent = "High";
  btnHigh.addEventListener("click", () => setImportanceForCurrentQuestion("HIGH"));

  const btnLow = document.createElement("button");
  btnLow.textContent = "Low";
  btnLow.addEventListener("click", () => setImportanceForCurrentQuestion("LOW"));

  const btnMedium = document.createElement("button");
  btnMedium.textContent = "Medium";
  btnMedium.addEventListener("click", () => setImportanceForCurrentQuestion("MEDIUM"));

  td.append(btnHigh, btnLow, btnMedium);
  tr.append(td);
  tbody.append(tr);
  table.append(tbody);

  wrap.append(h3, table);
  return wrap;
}

function createHandleUIInputs() {
  const wrap = document.createElement("div");

  const btnBack = document.createElement("button");
  btnBack.type = "button";
  btnBack.textContent = "Back";
  btnBack.addEventListener("click", backQuestion);

  const btnNext = document.createElement("button");
  btnNext.type = "button";
  btnNext.textContent = "Next";
  btnNext.addEventListener("click", nextQuestion);

  const btnSubmit = document.createElement("button");
  btnSubmit.type = "button";
  btnSubmit.textContent = "Submit";
  btnSubmit.addEventListener("click", postResponses);

  wrap.append(btnBack, btnNext, btnSubmit);
  return wrap;
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  // LoadState (simpelt)
  if (state.loading) {
    const loadingEl = document.createElement("div");
    loadingEl.textContent = "Loading...";
    app.append(loadingEl);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "grid"; // match din CSS hvis du har den i global CSS

  const currentQ = getCurrentQ();

  const questionSection = document.createElement("section");
  questionSection.className = "question";
  if (currentQ) questionSection.append(createQuestionView(currentQ));

  grid.append(questionSection);

  if (currentQ) {
    const controlsSection = document.createElement("section");
    controlsSection.className = "controls";

    controlsSection.append(
      createResponseButtons(),
      createImportanceButtons(),
      createHandleUIInputs()
    );

    grid.append(controlsSection);
  }

  const msg = document.createElement("p");
  msg.id = "vanillamsg";
  msg.className = "msg";

  app.append(grid, msg);
}

async function init() {
  setLoading(true);
  setMessage("");

  try {
    const data = await fetchData(ApiURLQuestions, "GET", null, false);
    state.questions = data;
    state.index = 0;
    state.responses = data.map(q => ({
      questionId: q.id,
      response: "NEUTRAL",
      importance: "MEDIUM",
    }));
  } catch (err) {
    setMessage(err.message);
  } finally {
    setLoading(false);
  }
}


init();

*/