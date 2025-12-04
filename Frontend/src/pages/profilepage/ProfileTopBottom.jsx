import { AdvancedImage, lazyload } from "@cloudinary/react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import { StyledButton } from "../../components/StyledButton";
import { cloudinaryCld } from "../../configs/cloudinary.config";
import { ProfilePageContext } from "../../state/ProfilePageContext";

const ProfileTopBottom = ({ userInfo, getQualifications, changeProfilePicture }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const {
    editProfileStatus,
    follow,
    setFollowingDone,
    setEditProfileStatus,
    profileInfoChanged,
  } = useContext(ProfilePageContext);
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);

  return (
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
          transform: isMobileScreens ? "translateY(20%)" : "translateY(40%)",
          position: "relative",
          aspectRatio: "1/1",
        }}
      >
        {userInfo?.picturePath ? (
          <AdvancedImage
            plugins={[lazyload()]}
            cldImg={cloudinaryCld.image(userInfo?.picturePath)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          <img
            src="/images/dummyPerson.jpeg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        )}
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
  );
};

export default ProfileTopBottom;
