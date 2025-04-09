'use client'
import {createContext,useEffect,useState, useContext, use} from 'react';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

const userContext = createContext();

export const UserContextProvider = ({children}) => {

    const serverUrl = "http://localhost:8000";
    const router = useRouter();
    const [user, setUser] = useState({});
    const [userState, setUserState] = useState({
        name:"",
        email:"",
        password:"",
    });
    const [loading, setLoading] = useState(true);

    //register user
    const registerUser = async(userData) => {

        userData.preventDefault();
        if(!userState.email.includes("@") || !userState.password || userState.password < 6){
            toast.error("Please fill all the fields correctly, a valid email and the password must be at least 6 characters long");
            return;
        }

        try {
            const res = await axios.post(`${serverUrl}/api/v1/register`,userState);
            toast.success("User registered successfully");
            //clear the form
            setUserState({
                name:"",
                email:"",
                password:"",
            });
            //redirect to login page
            router.push("/auth/login");
        } catch (error) {
            console.log("error registering user",error)
            toast.error(error.response.data.message);
        }
    }

    // login user

    const loginUser = async(userData) => {
        userData.preventDefault();
        console.log("user state login",userState);
        try {
            const res = await axios.post(`${serverUrl}/api/v1/login`,{
                email:userState.email,
                password:userState.password,
            },{
                withCredentials:true,
            })

            toast.success("User logged in successfully");

            setUser({
                name:"",
                email:"",

            })
            router.push("/")
        } catch (error) {
            console.log("error logging in user",error)
            toast.error(error.response.data.message);
        }
    }

    const userLoginStatus = async () => {
        let loggedInUser = false;
        try {
            await axios.get(`${serverUrl}/api/v1/login-status`, {
                withCredentials: true,
            })

            loggedInUser = !!res.data
            setLoading(false);

            if (!loggedInUser) {
                router.push("auth/login");
            }
        } catch (error) {
            console.log("error getting user login status", error)
        }

        return loggedInUser;
    }

    //logout user

    const logoutUser = async () => {
        try {
            await axios.get(`${serverUrl}/api/v1/logout`,{
                withCredentials: true,
            })
            toast.success("User logged out successfully");

            router.push("/auth/login");

        } catch (error) {
            console.log("error logging out user",error)
            toast.error(error.response.data.message);
        }
    }

    const handleUserInput = (name) => (e) => {
        const value = e.target.value
        console.log(`Updating ${name} with value:`, e.target.value);
        setUserState((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    useEffect(() => {
        userLoginStatus();
    },[])

    return(
        <userContext.Provider value={{
            registerUser,
            userState,
            handleUserInput,
            loginUser,
            logoutUser,
        }}>
            {children}
        </userContext.Provider>
    )
}

export const UseUserContext = () => {
    return useContext(userContext);
}