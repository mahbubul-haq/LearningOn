import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import FlexBetween from "../../components/FlexBetween";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProfilePageContext } from "../../state/ProfilePageContext";
import { GlobalContext } from "../../state/GlobalContext";
import { AdvancedImage } from "@cloudinary/react";
import { cloudinaryCld } from "../../configs/cloudinary.config";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IconButton } from "@mui/material";
import axios from "axios";

const ProfileTop = ({ userInfo }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state);
  //console.log(user, token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const mounted = React.useRef(true);
  const {
    follow,
    followingDone,
    setFollowingDone,
    editProfileStatus,
    setEditProfileStatus,
    profileInfoChanged,
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
        // padding: isNonMobileScreens
        //   ? "2rem 5rem 0rem 5rem"
        //   : isMobileScreens
        //   ? "1rem 1rem 0 1rem"
        //   : "2rem 2rem 0rem 2rem",
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

        <Box
          sx={{
            marginTop: isNonMobileScreens
              ? "-2rem"
              : isMobileScreens
              ? "1rem"
              : "-1rem",
            display: "flex",
            justifyContent: isMobileScreens ? "space-between" : "flex-start",
            alignItems: "flex-end",
            width: "100%",
            // border: "1px solid #ccc",
          }}
        >
          <Box
            sx={{
              width: isNonMobileScreens
                ? "180px"
                : isMobileScreens
                ? "120px"
                : "130px",
              height: isNonMobileScreens
                ? "180px"
                : isMobileScreens
                ? "120px"
                : "130px",
              borderRadius: "50%",
              boxShadow: "0 0 0 5px rgba(0, 0, 0, 0.2)",
              transform: isMobileScreens
                ? "translateY(20%)"
                : "translateY(40%)",
              position: "relative",
              aspectRatio: "1/1",
            }}
          >
            <AdvancedImage
              cldImg={cloudinaryCld.image(userInfo?.picturePath)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            {editProfileStatus === "editing" && (
              <Box
                title="Change Photo"
                sx={{
                  // transition: "all 1s ease",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  //backgroundColor: "rgba(255, 255, 255, 0.5)",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  top: 0,
                  left: 0,
                  cursor: "pointer",
                  zIndex: 1,

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "70%",
                    left: isNonMobileScreens ? "75%" : "65%",
                    backgroundColor: theme.palette.grey[200],
                    padding: "0.7rem",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <MdAddPhotoAlternate
                    size={isMobileScreens ? 20 : 25}
                    style={{
                      color: theme.palette.grey[900],
                    }}
                  />
                </IconButton>
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  onChange={changeProfilePicture}
                />
              </Box>
            )}
          </Box>
          <FlexBetween
            sx={{
              marginLeft: isMobileScreens ? "0" : "2rem",
              mb: isNonMobileScreens ? "1rem" : "0.5rem",
              flexGrow: 1,
              "&&": {
                justifyContent: isMobileScreens ? "flex-end" : "space-between",
              },
              alignItems: "flex-end",
            }}
          >
            {!isMobileScreens && (
              <FlexBetween
                sx={{
                  "&&": {
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "flex-start",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: isNonMobileScreens ? "1.5rem" : "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {userInfo?.name}
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>
                  {getQualifications()}
                </Typography>
              </FlexBetween>
            )}
            <StyledButton
              sx={{
                "&&": {
                  px: isMobileScreens ? "1rem" : "2rem",
                },
              }}
              onClick={() => {
                if (userInfo?._id == user?._id) {
                  if (editProfileStatus === "editing") {
                    setEditProfileStatus("");
                  } else {
                    setEditProfileStatus("editing");
                  }
                } else {
                  setFollowingDone(false);
                  follow(userInfo?._id);
                }
              }}
            >
              {userInfo?._id == user?._id
                ? editProfileStatus === "editing"
                  ? profileInfoChanged
                    ? "Save Update"
                    : "Cancel Edit"
                  : "Edit Profile"
                : userInfo?.followers?.length > 0 &&
                  userInfo?.followers?.reduce((prev, cur) => {
                    if (cur._id == user?._id) {
                      return true;
                    }
                    return prev || false;
                  })
                ? "Unfollow"
                : "Follow"}
            </StyledButton>
          </FlexBetween>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileTop;
