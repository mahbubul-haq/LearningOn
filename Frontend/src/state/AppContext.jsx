import { createContext } from "react";
import { apiFetch } from "../api/apiFetch";
import axiosClient from "../api/axiosClient";
import { clearAuthData, updateDateLogin } from "../api/authStore";
import { useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [listOfCategories, setListOfCategories] = useState([]);
    const [categoriesWithLabel, setCategoriesWithLabel] = useState([]); // [{name: "Development", label: "Development"}, {name: "Web Development", label: "Web Development"}

    const fetchCategories = async () => {
        const { data } = await axiosClient({
            url: `/api/v1/categories`,
            method: "GET",
        });
        setCategories(data.categories);
        console.log("categories", data.categories);
        // flatten the categories
        const flattenCategories = (categories) => {
            let result = [];
            categories?.forEach((category) => {
                result.push([category.name, category.name]);
                category.subcategories?.forEach((subcat) => {
                    result.push([subcat, category.name]);
                })
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
    }

    const fetchUser = async (token, lastAccessTokenTime) => {

        try {
            const { data } = await axiosClient({
                method: "GET",
                params: { light: "true" },
                headers: {
                    "auth-token": token
                },
                url: "/api/v1/users/me",
            })

            if (data.success) {
                updateDateLogin(data.user, token, lastAccessTokenTime)
            }
            else {
                clearAuthData();
            }
        } catch (error) {
            clearAuthData();
        }
    }

    return (
        <AppContext.Provider value={{
            fetchCategories,
            categories,
            setCategories,
            listOfCategories,
            setListOfCategories,
            categoriesWithLabel,
            setCategoriesWithLabel,
            fetchUser
        }}>
            {props.children}
        </AppContext.Provider>
    )
}