import { AdvancedImage, lazyload } from "@cloudinary/react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import { colorTokens } from "../../theme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import { StyledButton } from "../../components/StyledButton";
import { cloudinaryCld } from "../../configs/cloudinary.config";
import { ProfilePageContext } from "../../state/ProfilePageContext";

const ProfileTopBottom = ({ userInfo, getQualifications, changeProfilePicture, saveProfileChanges }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const {
    editProfileStatus,
    follow,
    setFollowingDone,
    setEditProfileStatus,
    profileInfoChanged,
    setProfileInfoChanged,
    changedProfileInfo,
    setChangedProfileInfo,
  } = useContext(ProfilePageContext);
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);

  return (
    <Box
      sx={{
        marginTop: isNonMobileScreens
          ? "-2rem"
          : isMobileScreens
            ? "2rem"  // Increased from 1rem to 2rem for more space from breadcrumbs
            : "1rem", // Changed from -1rem to 1rem to prevent overlap on tablet (600-900px)
        display: "flex",
        flexDirection: isMobileScreens ? "column" : "row", // Stack on mobile
        justifyContent: isMobileScreens ? "center" : "flex-start",
        alignItems: isMobileScreens ? "center" : "flex-end", // Center all items on mobile
        width: "100%",
        paddingBottom: "1rem",
        gap: isMobileScreens ? "1rem" : "0", // Gap for stacked items
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
          boxShadow: `0 0 0 5px ${colorTokens.translucentBlack.x2}`,
          transform: isNonMobileScreens ? "translateY(40%)" : "none", // No protrusion on mobile stack
          position: "relative",
          aspectRatio: "1/1",
          marginBottom: isMobileScreens ? "0.5rem" : "0",
        }}
      >
        {changedProfileInfo?.avatarPreview ? (
          <img src={changedProfileInfo.avatarPreview}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }} alt="preview" />
        ) : userInfo?.avatar?.secure_url ? (

          <img src={userInfo?.avatar?.secure_url}
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }} alt="avatar" />
        ) : userInfo?.avatar?.public_id ? (
          <AdvancedImage
            plugins={[lazyload()]}
            cldImg={cloudinaryCld.image(userInfo?.avatar?.public_id)}
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
              backgroundColor: colorTokens.translucentBlack.x1,
              top: 0,
              left: 0,
              cursor: "pointer",
              zIndex: 1,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "rgba(0,0,0,0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                backdropFilter: "blur(2px)",
              }}
            >
              <MdAddPhotoAlternate
                size={isMobileScreens ? 24 : 32}
                style={{
                  color: "#fff",
                }}
              />
            </Box>
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
          mb: isNonMobileScreens ? "1rem" : "0", // Remove bottom margin adjustment on mobile
          flexGrow: 1,
          width: isMobileScreens ? "100%" : "auto", // Take full width to center content
          "&&": {
            flexDirection: isMobileScreens ? "column" : "row", // Stack internal items on mobile too (Name <-> Button)
            justifyContent: isMobileScreens ? "center" : "space-between",
            alignItems: isMobileScreens ? "center" : "flex-end",
            gap: isMobileScreens ? "1rem" : "0",
          },
        }}
      >
        <Box
          sx={{
            textAlign: isMobileScreens ? "center" : "left",
            display: "flex",
            flexDirection: "column",
            alignItems: isMobileScreens ? "center" : "flex-start",
            gap: "0.25rem",
          }}
        >
          <Typography
            sx={{
              fontSize: isNonMobileScreens ? "1.5rem" : "1.2rem",
              fontWeight: "bold",
              color: theme.palette.text.primary,
            }}
          >
            {userInfo?.name}
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: theme.palette.text.secondary }}>
            {getQualifications()}
          </Typography>
        </Box>

        {userInfo?._id == user?._id && editProfileStatus === "editing" ? (
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              width: isMobileScreens ? "100%" : "auto",
              flexDirection: isMobileScreens ? "column" : "row",
              alignItems: "center",
            }}
          >
            <StyledButton
              sx={{
                "&&": {
                  px: isMobileScreens ? "2rem" : "2rem",
                  width: isMobileScreens ? "100%" : "auto",
                  maxWidth: isMobileScreens ? "300px" : "none",
                  backgroundColor: theme.palette.error.main,
                  "&:hover": {
                    backgroundColor: theme.palette.error.dark,
                  },
                },
              }}
              onClick={() => {
                setEditProfileStatus("");
                setProfileInfoChanged(false);
                setChangedProfileInfo({});
              }}
            >
              Cancel Edit
            </StyledButton>
            {profileInfoChanged && (
              <StyledButton
                sx={{
                  "&&": {
                    px: isMobileScreens ? "2rem" : "2rem",
                    width: isMobileScreens ? "100%" : "auto",
                    maxWidth: isMobileScreens ? "300px" : "none",
                  },
                }}
                onClick={() => saveProfileChanges()}
              >
                Save Update
              </StyledButton>
            )}
          </Box>
        ) : (
          <StyledButton
            sx={{
              "&&": {
                px: isMobileScreens ? "2rem" : "2rem", // More touch area
                width: isMobileScreens ? "100%" : "auto", // Optional: Full width button on mobile? User complained about squeezed. Let's keep it auto but with min-width maybe. Or just ample padding.
                maxWidth: isMobileScreens ? "300px" : "none",
              },
            }}
            onClick={() => {
              if (userInfo?._id == user?._id) {
                setEditProfileStatus("editing");
              } else {
                setFollowingDone(false);
                follow(userInfo?._id);
              }
            }}
          >
            {userInfo?._id == user?._id
              ? "Edit Profile"
              : userInfo?.followers?.length > 0 &&
                userInfo?.followers?.reduce((prev, cur) => {
                  if (cur._id == user?._id) {
                    return true;
                  }
                  return prev || false;
                }, false)
                ? "Unfollow"
                : "Follow"}
          </StyledButton>
        )}
      </FlexBetween>
    </Box>
  );
};

export default ProfileTopBottom;
