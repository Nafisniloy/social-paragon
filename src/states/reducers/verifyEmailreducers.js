const verifyEmailreducers=(state="pending",action)=>{
    if (action.type==='addemail') {
        return  action.payload
    } 
    else{
        return state;
    }
    
    }
    export default verifyEmailreducers;