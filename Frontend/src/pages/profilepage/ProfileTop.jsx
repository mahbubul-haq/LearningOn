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
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
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
    if (file.size > 1000000) {
      alert("File size is too large. Please upload a file less than 1MB");
      return;
    }

    if (![`image/jpeg`, `image/png`, `image/jpg`].includes(file.type)) {
      alert("Only jpg, jpeg and png files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("picture", file);
    formData.append("isVideo", "false");

    await deleteFile(userInfo?.picturePath, false);

    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/fileupload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": token,
        },
      }
    );

    const data = res.data;
   // console.log(data);

    if (data.success) {
      setChangedProfileInfo({
        ...changedProfileInfo,
        picturePath: data.fileName,
      });
    } else {
      console.log("File upload failed");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.bottom,
        backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "2000px",
          mx: "auto",
          padding: isNonMobileScreens
            ? "2rem 64px 0rem 64px"
            : isMobileScreens
            ? "1rem 24px 0 24px"
            : "2rem 24px 0rem 24px",
        }}
      >
        <BreadCrumbs
          sx={{
            color: theme.palette.grey.grey300,
            "& .MuiBreadcrumbs-separator": {
              color: theme.palette.grey.grey300,
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
          getQualifications = {getQualifications}
          changeProfilePicture={changeProfilePicture}
        />
        
      </Box>
    </Box>
  );
};

export default ProfileTop;
