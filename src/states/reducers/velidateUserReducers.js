const velidateUserReducers=(state="pending",action)=>{
    if(action.type==='adduser'){
        
        return  action.payload
    }else{
        return state;
    }
    
    }
    export default velidateUserReducers;