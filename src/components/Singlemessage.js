import React, { useEffect } from 'react'

const Singlemessage = (props) => {
    const {messages}= props
    // console.log(messages)
    useEffect(() => {
        // console.log(messages)
    }, [messages]);
    if(messages.forMe==="sent"){

        return (
          <div className='single-message-card-sent my-5' >
              {messages.message}
          </div>
        )
    }else if(messages.forMe==="received"){
        
        return (
            <div className='single-message-card-received my-5' id={messages._id} >
                {messages.message}
                
            </div>
          )
    }
}

export default Singlemessage