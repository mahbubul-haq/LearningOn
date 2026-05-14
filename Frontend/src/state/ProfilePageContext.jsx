/* eslint-disable react/prop-types */
import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { apiFetch } from "../api/apiFetch";
import { clearAuthData, updateAccessToken } from "../api/authStore";
import { useNavigate } from "react-router-dom";

export const ProfilePageContext = createContext();

export const ProfilePageState = (props) => {
  const navigate = useNavigate();
  const [openedTab, setOpenedTab] = React.useState("profile");
  const { token } = useSelector((state) => state.auth);
  const [followingDone, setFollowingDone] = React.useState(false);
  const [editProfileStatus, setEditProfileStatus] = React.useState("");
  const [profileInfoChanged, setProfileInfoChanged] = React.useState(false);
  const [changedProfileInfo, setChangedProfileInfo] = React.useState({});

  const follow = async (userId) => {
    try {
      const data = await apiFetch(
        {
          url: `api/v1/users/${userId}/follow`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        // console.log(data.data);
        setFollowingDone(true);
      }
    } catch (err) {
      //console.log(err?.message);
    }
  };

  const updateProfile = async () => {
    try {
      const data = await apiFetch(
        {
          url: `api/v1/users/profile`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          data: changedProfileInfo,
        }
      );


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

  const logout = async () => {
    try {
      const data = await apiFetch(
        {
          url: "/api/v1/auth/logout",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        clearAuthData();
        navigate("/", { replace: true });
      }
    } catch (err) {
      //console.log(err?.message);
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
        logout,
      }}
    >
      {props.children}
    </ProfilePageContext.Provider>
  );
};
