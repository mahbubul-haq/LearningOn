import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLogin } from "./reduxStore/authSlice";
import { apiFetch } from "../api/apiFetch";

export const GlobalContext = createContext();

export const GlobalState = (props) => {
  const [categories, setCategories] = React.useState([]);
  const [listOfCategories, setListOfCategories] = React.useState([]);
  const [categoriesWithLabel, setCategoriesWithLabel] = React.useState([]); // [{name: "Development", label: "Development"}, {name: "Web Development", label: "Web Development"}
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

  const getCategories = async () => {
    const data = await apiFetch({
      url: `/api/v1/categories`,
      method: "GET",
    });
    setCategories(data.categories);
    // flatten the categories
    const flattenCategories = (categories) => {
      let result = [];
      categories?.forEach((category) => {
        result.push([category.name, category.name]);
        if (category.subcategories?.length > 0) {
          for (const subcategory of category.subcategories) {
            result.push([subcategory, category.name]);
          }
        }
      });
      return result;
    };

    //sort the flattened

    const sortedCategories = flattenCategories(data.categories).sort();
    const categoriesWithLabel = sortedCategories.map((category, index) => {
      return { label: category[0], id: index + 1, category: category[1] };// label:  subcategory or category name, category: parent category name
    });
    setCategoriesWithLabel(categoriesWithLabel);

    setListOfCategories(sortedCategories.map((category) => category[0]));

    //console.log("categories fetched");
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
    getUser();
    getCategories();
    getUsers();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        categories,
        setCategories,
        listOfCategories,
        categoriesWithLabel,
        getUsers,
        users,
        setUsers,
        getCategories,
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
