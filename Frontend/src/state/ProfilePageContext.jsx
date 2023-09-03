import { createContext } from "react";
import React from "react";

export const ProfilePageContext = createContext();

export const ProfilePageState = (props) => {

    const [openedTab, setOpenedTab] = React.useState("profile");

    return (
        <ProfilePageContext.Provider value={{
            openedTab,
            setOpenedTab
        }}>
            {props.children}
        </ProfilePageContext.Provider>
    );
}