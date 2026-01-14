import facade from "../apiFacade";

export async function fetchData(url, method, body, needAuth){

  const options = facade.makeOptions(method, needAuth, body );
   
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