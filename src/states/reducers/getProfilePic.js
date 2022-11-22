const getMyprofilePicreducers=(state="https://paragon.learnfacts.xyz/default-profile-picture.png",action)=>{
// const getMyprofilePicreducers=(state="../default-profile-picture.png",action)=>{
    if (action.type==='getProfilePic') {
        return  action.payload
    } 
    else{
        return state;
    }
    
    }
    export default getMyprofilePicreducers;