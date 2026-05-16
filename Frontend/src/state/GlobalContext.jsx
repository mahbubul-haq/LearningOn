import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLogin } from "./reduxStore/authSlice";
import { apiFetch } from "../api/apiFetch";

export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const [users, setUsers] = React.useState([]);

  const [user, setUser] = React.useState(null);
  const [userById, setUserById] = React.useState(null);
  const [courseById, setCourseById] = React.useState(null);
  const [openedItem, setOpenedItem] = React.useState("");

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const data = await apiFetch({
        url: `/api/v1/users/me`,
        method: "GET",
      });
      if (data.success) {
        setUser(data.user);
        console.log("user fetched", data.user);
        dispatch(
          setLogin({
            token,
            user: data.user,
          })
        );
      } else {
        //dispatch(setLogout());
        dispatch(setLogin({ token: token, user: null }));
      }
    } catch (err) {
      //console.log(err?.message);
      //dispatch(setLogout());
      dispatch(setLogin({ token: token, user: null }));
    }
  };

  const getUsers = async () => {
    const data = await apiFetch({
      url: `/api/v1/users`,
      method: "GET",
    });

    if (data.success) {
      setUsers(data.users);
      // console.log("users fetched", data.users);
    }
  };

  const deleteFile = async (fileName, isVideo) => {
    try {
      let modifiedFileName = fileName.replace(/\//g, "@");

      const data = await apiFetch({
        url: `/filedelete/${modifiedFileName}/${isVideo ? "true" : "false"}`,
        method: "DELETE",

      }
      );

      if (data.success) {
        console.log("file deleted", data);
      } else {
        console.log("file deletion failed", data);
      }
    } catch (err) {
      //console.log(err?.message);
    }
  };

  const getUserById = async (userId) => {
    try {

      const data = await apiFetch({
        url: `/api/v1/users/${userId}`,
        method: "GET",
      });

      //console.log(data);
      if (data.success) {
        setUserById(data.user);
        console.log("user fetched", data.user);
      } else {
        setUserById(null);
      }
    } catch (err) {
      //console.log(err?.message);
      setUserById(null);
    }
  };

  const getCourseById = async (courseId) => {
    try {
      const data = await apiFetch({
        url: `/api/v1/courses/${courseId}`,
        params: { populate: "true" },
        method: "GET",
      });

      if (data.success) {

        console.log("course by id", data.courseInfo);
        setCourseById(data.courseInfo);
      }
      console.log("course by id", data);
    } catch (err) {
      //console.log(err?.message);
      console.log("course by id failed", err);
    }
  };

  useEffect(() => {
    // getUser();
    // getCategories();
    getUsers();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        getUsers,
        users,
        setUsers,
        deleteFile,
        getUserById,
        userById,
        setUserById,
        courseById,
        setCourseById,
        getCourseById,
        openedItem,
        setOpenedItem,
        getUser,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
