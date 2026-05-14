import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { GlobalContext } from "../../state/GlobalContext";
import { ProfilePageContext } from "../../state/ProfilePageContext";
import ProfileTopBottom from "./ProfileTopBottom";

const ProfileTop = ({ userInfo }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  //console.log(user, token);
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const mounted = React.useRef(true);
  const {
    followingDone,
    setFollowingDone,
    editProfileStatus,
    setEditProfileStatus,
    changedProfileInfo,
    setChangedProfileInfo,
    updateProfile,
  } = React.useContext(ProfilePageContext);
  const { setUserById, getUserById, getUser, deleteFile } =
    React.useContext(GlobalContext);

  const getQualifications = () => {
    let qualifications = [];

    if (userInfo?.learning?.length > 0) {
      qualifications.push("Student");
    }
    if (userInfo?.courses?.length > 0) {
      qualifications.push("Instructor");
    }
    if (userInfo?.tutoring?.length > 0) {
      qualifications.push("Tutor");
    }
    if (userInfo?.blogs?.length > 0) {
      qualifications.push("Blogger");
    }

    if (qualifications?.length === 0) {
      qualifications.push("Student");
    }
    return qualifications.join(", ");
  };

  useEffect(() => {
    if (followingDone) {
      getUserById(userInfo?._id);
      getUser();
      setFollowingDone(false);
    }
  }, [followingDone]);

  useEffect(() => {
    if (editProfileStatus === "updated") {
      setUserById({
        ...userInfo,
        ...changedProfileInfo,
      });
      setEditProfileStatus("editing");
      setChangedProfileInfo({
        ...changedProfileInfo,
        picturePath: "",
      });
    }
  }, [editProfileStatus]);

  useEffect(() => {
    console.log(changedProfileInfo.picturePath, mounted.current);
    if (mounted.current === false && changedProfileInfo.picturePath) {
      updateProfile();

    }
    mounted.current = false;
  }, [changedProfileInfo.picturePath]);

  const changeProfilePicture = async (e) => {
    const file = e.target.files[0];
    //console.log(file);
    if (!file) {
      return;
    }
    if (file.size > 5000000) {
      alert("File size is too large. Please upload a file less than 5MB");
      return;
    }

    if (![`image/jpeg`, `image/png`, `image/jpg`].includes(file.type)) {
      alert("Only jpg, jpeg and png files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("picture", file);
    formData.append("resource_type", "image");

    //await deleteFile(userInfo?.picturePath, false);

    const data = await apiFetch({
      url: `/api/v1/users/profile-picture`,
      method: "PATCH",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });


    console.log(data);

    if (data.success) {
      setUserById(prev => {
        return {
          ...prev,
          avatar: data.avatar
        }
      });
    } else {
      console.log("File upload failed");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        // Background handled by parent glass container
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "2000px",
          mx: "auto",
          padding: isNonMobileScreens
            ? "2rem 2rem 0rem 2rem" // Reduced side padding as parent has padding
            : "1rem 1rem 0 1rem",
        }}
      >
        <BreadCrumbs
          sx={{
            color: theme.palette.text.secondary,
            "& .MuiBreadcrumbs-separator": {
              color: theme.palette.text.secondary,
            },
          }}
          aria-label="breadcrumb"
        >
          <FlexBetween
            sx={{
              cursor: "pointer",

              gap: "0.5rem",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/")}
          >
            <HomeIcon sx={{ fontSize: "1.2rem" }} />
            <Typography sx={{ fontSize: "1rem" }}>Home</Typography>
          </FlexBetween>
          <Typography sx={{ fontSize: "1rem" }}>Users</Typography>
          <Typography sx={{ fontSize: "1rem" }}>Profile</Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              cursor: "pointer",
              color: theme.palette.grey.grey600,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/profile/" + userInfo?._id)}
          >
            {userInfo?.name}
          </Typography>
        </BreadCrumbs>
        <ProfileTopBottom
          userInfo={userInfo}
          getQualifications={getQualifications}
          changeProfilePicture={changeProfilePicture}
          setUserById={setUserById}
        />

      </Box>
    </Box>
  );
};

export default ProfileTop;
