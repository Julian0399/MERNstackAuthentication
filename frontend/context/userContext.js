'use client'
import {createContext,useEffect,useState, useContext, use} from 'react';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

const userContext = createContext();

export const UserContextProvider = ({children}) => {

    const serverUrl = "http://localhost:8000";
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [userState, setUserState] = useState({
        name:"",
        email:"",
        password:"",
    });
    const [loading, setLoading] = useState(true);

    //register user
    const registerUser = async(userData) => {
        console.log("im here")
        userData.preventDefault();
        if(!userState.email.includes("@") || !userState.password || userState.password < 6){
            toast.error("Please fill all the fields correctly, the password must be at least 6 characters long");
            console.log("Please fill all the fields correctly, the password must be at least 6 characters long");
            return;
        }
        try {
            const res = await axios.post(`${serverUrl}/api/v1/register`,userState);
            console.log("user registered",res.data);
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


    const handleUserInput = (name) => (e) => {
        const value = e.target.value
        console.log(`Updating ${name} with value:`, e.target.value);
        setUserState((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    return(
        <userContext.Provider value={{
            registerUser,
            userState,
            handleUserInput,
        }}>
            {children}
        </userContext.Provider>
    )
}

export const UseUserContext = () => {
    return useContext(userContext);
}