
import facade from "../apiFacade";

export function fetchDataCall(url, callback, method, needAuth, errorCallBack, body) {

    const headers =
        {
            'Accept': 'application/json'
        }

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json'
    }

      if (needAuth === true) {
    const token = facade.getToken();
    headers["Authorization"] = `Bearer ${token}`;
  }

    const options = {
        method,
        headers
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

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
.then(data => { if (data !== null) callback(data); })
        .catch(err => {
            console.error("fetchDataCall error:", err);
           if (errorCallBack) {
    errorCallBack("Network error. Connection failed, or no response.");
  } 
        });

  /*      else {
    console.log("Network or JS error");
  } */
/*
    fetch(url, options)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => console.log(e.detail))
            } else {
                console.log("Network error");
            }
        }) */
}