import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Specificresults from './Specificresults';

const Searchresult = () => {
    const [SearchParams] = useSearchParams();
    const query = SearchParams.get("query");
    const [results, setresults] = useState(null);
    const [name, setname] = useState(null);
    const search= async()=>{
        const response = await  fetch(`https://social-paragon-backend.vercel.app/api/profile/search/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: query
            }),
          })
          const json = await response.json()
          setresults(json)
          setname(json.result)
    }
    useEffect(() => {
        search();
        document.title=`${query} - Social Paragon`

    }, []);
        // console.log(results)
        if(results){
         
            if (results.success==="true") {
                // results.result.forEach(element => {
                //     // console.log(element.name)
                //     setname(element)
                // });
                
           return(     name.map((name)=>{
            if(name.verified==="true"){
                return  (
                        <div className='medium-width-card' >
                            <Specificresults key={name._id} name={name}/>

                        </div>
                        )
                }
                })
           )
                } else {
                    
                    return (
                      <div className='medium-width-card txt-center'>{results.message}</div>
                    )
                }
        }
}

export default Searchresult