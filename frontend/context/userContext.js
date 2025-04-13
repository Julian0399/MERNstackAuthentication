"use client";
import { createContext, useEffect, useState, useContext, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";
  const router = useRouter();
  const [user, setUser] = useState({});
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  //register user
  const registerUser = async (userData) => {
    userData.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password < 6
    ) {
      toast.error(
        "Please fill all the fields correctly, a valid email and the password must be at least 6 characters long"
      );
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      toast.success("User registered successfully");
      //clear the form
      setUserState({
        name: "",
        email: "",
        password: "",
      });
      //redirect to login page
      router.push("/auth/login");
    } catch (error) {
      console.log("error registering user", error);
      toast.error(error.response.data.message);
    }
  };

  // login user

  const loginUser = async (userData) => {
    userData.preventDefault();
    console.log("user state login", userState);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("User logged in successfully");

      setUser({
        name: "",
        email: "",
      });
      await getUser();
      router.push("/");
    } catch (error) {
      console.log("error logging in user", error);
      toast.error(error.response.data.message);
    }
  };

  const userLoginStatus = async () => {
    let loggedInUser = false;
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        withCredentials: true,
      });
      console.log("user login status", res.data);
      loggedInUser = !!res.data;
      setLoading(false);

      if (!loggedInUser) {
        router.push("auth/login");
      }
    } catch (error) {
      console.log("error getting user login status", error);
    }

    return loggedInUser;
  };

  //logout user

  const logoutUser = async () => {
    try {
      await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true,
      });
      toast.success("User logged out successfully");

      router.push("/auth/login");
    } catch (error) {
      console.log("error logging out user", error);
      toast.error(error.response.data.message);
    }
  };

  // get user data
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`, {
        withCredentials: true,
      });
      setUser((prev) => {
        return {
          ...prev,
          ...res.data,
        };
      });
      setLoading(false);
    } catch (error) {
      console.log("error getting user data", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
        withCredentials: true,
      });
      //update

      setUser((prev) => {
        return {
          ...prev,
          ...res.data,
        };
      });

      toast.success("User updated successfully");
      setLoading(false);
    } catch (error) {
      console.log("error updating user data", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const emailVerification = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-email`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Verification email sent successfully");
      setLoading(false);
    } catch (error) {
      console.log("error sending verification email", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-user/${token}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("User verified successfully");
      getUser();
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log("error verifying user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/forgot-password`,
        {
          email,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Password reset email sent successfully");
      setLoading(false);
    } catch (error) {
      console.log("error sending password reset email", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const recoveryPassword = async (token, password) => {
    setLoading(true);
    try {
      console.log("Sending request with token:", token);

      const res = await axios.post(
        `${serverUrl}/api/v1/reset-password/${token}`,
        {
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Password reset successfully");
      setLoading(false);
      router.push("/auth/login");
    } catch (error) {
      console.log("error resetting password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  const handleUserInput = (name) => (e) => {
    const value = e.target.value;
    console.log(`Updating ${name} with value:`, e.target.value);
    setUserState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();

      if (isLoggedIn) {
        getUser();
      }
    };
    loginStatusGetUser();
  }, []);
  console.log("user state", user);
  return (
    <userContext.Provider
      value={{
        registerUser,
        userState,
        handleUserInput,
        loginUser,
        logoutUser,
        userLoginStatus,
        user,
        updateUser,
        emailVerification,
        verifyUser,
        forgotPassword,
        recoveryPassword,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const UseUserContext = () => {
  return useContext(userContext);
};
