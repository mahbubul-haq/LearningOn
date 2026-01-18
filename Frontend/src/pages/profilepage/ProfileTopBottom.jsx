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

const ProfileTopBottom = ({ userInfo, getQualifications, changeProfilePicture }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
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
            <IconButton
              sx={{
                position: "absolute",
                top: "70%",
                left: isNonMobileScreens ? "75%" : "65%",
                backgroundColor: theme.palette.grey[200],
                padding: "0.7rem",
                boxShadow: `0 0 5px ${colorTokens.translucentBlack.x5}`,
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
