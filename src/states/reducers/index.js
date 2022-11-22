import { combineReducers } from "redux";
import velidateUserReducers from "./velidateUserReducers";
import verifyEmailreducers from "./verifyEmailreducers";
import getMyProfileReducers from "./getMyProfile";
import getMyprofilePicreducers from "./getProfilePic";

const reducer= combineReducers({
    velidateUser: velidateUserReducers,
    verifyEmail: verifyEmailreducers,
    getMyProfile:getMyProfileReducers,
    getMyprofilePic:getMyprofilePicreducers
})
export default reducer;