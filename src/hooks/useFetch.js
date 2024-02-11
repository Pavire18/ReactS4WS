import React from "react";

const useFetch = (apiUrl,textParam,setData) => {

  React.useEffect(() => {
    let options = {
      headers: {
        'Authorization': "ZNMIELWRPj3cGN5rzrZ3WNT257cPlBA1QhXYuFxkjt1yoWufJ4Xjmzrd"
      }
    };
    const finalUrl=apiUrl+"/search?query="+textParam;
    fetch(finalUrl,options)
      .then(data => data.json())
      .then(dataParsed => {
        setData(dataParsed.photos);
      })
      .catch((error) =>{
        console.log(error);
      })
    }, [textParam]);
}

export default useFetch;
