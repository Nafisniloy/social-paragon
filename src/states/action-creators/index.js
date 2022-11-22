// eslint-disable-next-line
import { type } from "@testing-library/user-event/dist/type"

export const verifyUser=(result)=>{
    return(dispatch)=>{
        dispatch({
        type:'adduser',
        payload: result
        })
    }
}
export const verifiedEmail=(result)=>{
    return(dispatch)=>{
        dispatch({
        type:'addemail',
        payload: result
        })
    }
}
export const getMyProfile=(result)=>{
    return(dispatch)=>{
        dispatch({
        type:'getMyProfile',
        payload: result
        })
    }
}
export const getProfilePic=(result)=>{
    return(dispatch)=>{
        dispatch({
        type:'getProfilePic',
        payload: result
        })
    }
}