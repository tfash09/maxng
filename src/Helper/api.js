 
const fetchJSON = async (url, data = {}, type) => {

    const rootUrl = 'https://swapi.dev/api/';
     let appUrl = rootUrl + url; 
     let headerContent = {
         'Content-type': 'application/json',
     }
  
     if(type == "PUT" || type == "POST" || type == "PATCH"){
         const res = await fetch(appUrl, {
             method: type,
             headers: headerContent,
             body: JSON.stringify(data)
         })      
         const res2 = await res.json();          
         return res2;      
     }else{
         const res = await fetch(appUrl, {
             method: type,
             headers: headerContent,
         })      
         const res2 = await res.json();          
         return res2;
     }
 };
 
 export { fetchJSON };
 