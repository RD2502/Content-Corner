import { toast } from "react-toastify";
import { USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstant"
import axios from 'axios'
import { base } from "../../utils/config";
export const userSignupAction=(user)=>async(dispatch)=>{
    dispatch({type:USER_SIGNUP_REQUEST});
    try {
        const{data}=await axios.post(`${base}/api/signup`,user)
        localStorage.setItem('userInfo',JSON.stringify(data));
        console.log(data)
        dispatch({
            type:USER_SIGNUP_SUCCESS,
            payload:data
        });
        toast.success("Registered Successfully")
    } catch (error) {
        dispatch({
            type:USER_SIGNUP_FAIL,
            payload:error.response.data.error
        })
        toast.error(error.response.data.error)
    }
}
export const userSignInAction=(user)=>async(dispatch)=>{
    dispatch({type:USER_SIGNIN_REQUEST});
    try {
        const{data}=await axios.post(`${base}/api/signin`,user,{ withCredentials: true});
        console.log(data)
        localStorage.setItem('userInfo',JSON.stringify(data));
        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:data
        });
        toast.success("LoggedIn Successfully")
    } catch (error) {
        dispatch({
            type:USER_SIGNIN_FAIL,
            payload:error.response.data.error
        })
        toast.error(error.response.data.error)
    }
}
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`${base}/api/me`,{ withCredentials: true});
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        localStorage.removeItem('userInfo');
        const { data } = await axios.get(`${base}/api/logout`,{ withCredentials: true});
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}
