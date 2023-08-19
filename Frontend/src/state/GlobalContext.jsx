import React, { createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import state, { setLogout, setLogin } from ".";

export const GlobalContext = createContext();

export const GlobalState = (props) => {
    const [categories, setCategories] = React.useState([]);
    const [listOfCategories, setListOfCategories] = React.useState([]);
    const [categoriesWithLabel, setCategoriesWithLabel] = React.useState([]); // [{name: "Development", label: "Development"}, {name: "Web Development", label: "Web Development"}
    const [users, setUsers] = React.useState([]);
    const [user, setUser] = React.useState(null);

    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const getUser = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_URL}/users/getuser`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );

            const data = await response.json();
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
            console.log(err?.message);
            //dispatch(setLogout());
            dispatch(setLogin({ token: token, user: null }));
        }
    };

    const getCategories = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_URL}/data/getcategories`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        setCategories(data.categories);
        // flatten the categories
        const flattenCategories = (categories) => {
            let result = [];
            categories.forEach((category) => {
                result.push(category.name);
                if (category.subcategories?.length > 0) {
                    for (const subcategory of category.subcategories) {
                        result.push(subcategory);
                    }
                }
            });
            return result;
        };

        //sort the flattened

        const sortedCategories = flattenCategories(data.categories).sort();
        const categoriesWithLabel = sortedCategories.map((category, index) => {
            return { label: category, id: index + 1 };
        });
        setCategoriesWithLabel(categoriesWithLabel);

        setListOfCategories(sortedCategories);

        console.log("categories fetched");
    };

    const getUsers = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_URL}/users/all`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            }
        );
        const data = await response.json();

        if (data.success) {
            setUsers(data.users);
            console.log("users fetched", data.users);
        }
    };

    const deleteFile = async (fileName) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_URL}/filedelete/${fileName}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );

            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err?.message);
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
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
