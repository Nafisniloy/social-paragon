const getMyProfileReducers=(state="null",action)=>{
    if(action.type==='getMyProfile'){
        
        return  action.payload
    }else{
        return state;
    }
    
    }
    export default getMyProfileReducers;