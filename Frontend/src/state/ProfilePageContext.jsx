/* eslint-disable react/prop-types */
import { createContext } from "react";
import React from "react";
import { useSelector } from "react-redux";
export const ProfilePageContext = createContext();


export const ProfilePageState = (props) => {

    const [openedTab, setOpenedTab] = React.useState("profile");
    const {token} = useSelector(state => state);
    const [followingDone, setFollowingDone] = React.useState(false);

    const  follow = async (userId) => {

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/follow/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            }); 

            const data = await res.json();

            if (data.success) {
                console.log(data);
                setFollowingDone(true);
            }
        }
        catch (err) {
            //console.log(err?.message);
        }

    }

    return (
        <ProfilePageContext.Provider value={{
            openedTab,
            setOpenedTab,
            follow,
            followingDone,
            setFollowingDone
        }}>
            {props.children}
        </ProfilePageContext.Provider>
    );
}