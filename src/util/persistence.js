import facade from "../apiFacade";

export async function fetchData(url, method, body, needAuth){

    const headers =
        {
            'Accept': 'application/json'
        }

    if (method === 'POST' || method === 'PUT' || method === "PATCH" ) {
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

    try{
    const response = await fetch(url, options);
    const data = await response.json();
    
        if (!response.ok) {
      throw new Error( data.msg || `HTTP error ${response.status}`);
    }
    return data;
      }
    catch(error){
        console.error('Error fetching data:', error);
        throw new Error(error.message || "Network error. Try again later.");
    }

}