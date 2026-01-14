
import facade from "../apiFacade";

export function fetchDataCall(url, callback, method, needAuth, errorCallBack, body) {

    const headers =
        {
            'Accept': 'application/json'
        }

      if (needAuth === true) {
    const token = facade.getToken();
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = facade.makeOptions(method, needAuth, body )

const controller = new AbortController();
  options.signal = controller.signal;

  const timeoutId = setTimeout(() => {
    controller.abort(); 
  }, 180000);

    fetch(url, options)
         .then(res => {
    if (!res.ok) {
     return res.json().then(errData => {
        const msg = errData.msg
       
if (errorCallBack) errorCallBack(msg);
        return null; 
    });
}  
    return res.json();
  
})
.then(data => { 
    if (data !== null) callback(data); })
        .catch(err => {
            console.error("fetchDataCall error:", err);
           if (errorCallBack) 
    errorCallBack("Network error. Connection failed, or no response.");
}) 
   .finally(() => {
      clearTimeout(timeoutId);
        });
    }
