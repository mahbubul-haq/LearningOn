/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";

export const ProfilePageContext = createContext();

export const ProfilePageState = (props) => {
  const [openedTab, setOpenedTab] = React.useState("profile");
  const { token } = useSelector((state) => state);
  const [followingDone, setFollowingDone] = React.useState(false);
  const [editProfileStatus, setEditProfileStatus] = React.useState("");
  const [profileInfoChanged, setProfileInfoChanged] = React.useState(false);
  const [changedProfileInfo, setChangedProfileInfo] = React.useState({});

  const follow = async (userId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/follow/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        console.log(data);
        setFollowingDone(true);
      }
    } catch (err) {
      //console.log(err?.message);
    }
  };

  const updateProfile = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(changedProfileInfo),
        }
      );

      const data = await res.json();

      if (data.success) {
        setEditProfileStatus("updated");
      } else {
        setEditProfileStatus("error");
      }
    } catch (err) {
      //console.log(err?.message);
      setEditProfileStatus("error");
    }
  };

  return (
    <ProfilePageContext.Provider
      value={{
        openedTab,
        setOpenedTab,
        follow,
        followingDone,
        setFollowingDone,
        editProfileStatus,
        setEditProfileStatus,
        profileInfoChanged,
        setProfileInfoChanged,
        changedProfileInfo,
        setChangedProfileInfo,
        updateProfile,
      }}
    >
      {props.children}
    </ProfilePageContext.Provider>
  );
};
