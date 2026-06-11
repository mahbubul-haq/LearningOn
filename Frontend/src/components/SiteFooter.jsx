import React from 'react';
import { Box, Button, Container, Divider, IconButton, Stack, Typography, useTheme, keyframes } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExploreIcon from "@mui/icons-material/Explore";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-30px, 50px) scale(1.2); }
  66% { transform: translate(20px, -20px) scale(0.8); }
`;

const SiteFooter = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const year = new Date().getFullYear();
  const isDark = theme.palette.mode === "dark";

  const goTo = (path, authRequired = false) => {
    if (authRequired && !user) {
      navigate("/login", { state: { isLogin: true, redirect: path } });
      return;
    }
    navigate(path);
  };

  const footerLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Publish", path: "/publishcourse", authRedirect: true },
  ];

  const highlights = [
    { icon: SchoolIcon, label: "Learn at your pace" },
    { icon: AutoStoriesIcon, label: "Practical course paths" },
    { icon: ExploreIcon, label: "Discover fresh skills" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        pt: { xs: 8, md: 12 },
        pb: { xs: 4, md: 6 },
        // mt: { xs: "6rem", md: "12rem" },
        background: isDark
          ? `linear-gradient(180deg, rgba(10,10,14,0) 0%, rgba(10,10,14,0.95) 20%, rgba(10,10,14,1) 100%)`
          : `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.85) 100%)`,
        backdropFilter: isDark ? "none" : "blur(12px)",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Animated Background Orbs */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "40%",
          height: "100%",
          background: isDark
            ? `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.35)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.25)} 0%, transparent 70%)`,
          filter: "blur(60px)",
          animation: `${float1} 15s ease-in-out infinite`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "40%",
          height: "100%",
          background: isDark
            ? `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.3)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.2)} 0%, transparent 70%)`,
          filter: "blur(60px)",
          animation: `${float2} 20s ease-in-out infinite`,
          zIndex: 0,
        }}
      />

      <Box sx={{ width: "100%", maxWidth: "1500px", mx: "auto", px: { xs: "24px", md: "64px" }, position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "2fr 1fr 1.5fr" },
            gap: { xs: 6, md: 8 },
            mb: 8,
            // width: "100%",
          }}
        >
          {/* Brand & CTA */}
          <Stack spacing={3} alignItems="flex-start">
            <Typography
              component="button"
              onClick={() => navigate("/")}
              sx={{
                border: 0,
                background: "transparent",
                cursor: "pointer",
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 900,
                lineHeight: 1,
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                p: 0,
                transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "&:hover": { transform: "scale(1.05)" }
              }}
            >
              <Box component="span" sx={{ color: "text.primary" }}>Learning</Box>
              <Box
                component="span"
                sx={{
                  color: "transparent",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                On
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: "400px",
                color: "text.secondary",
                fontSize: "1.05rem",
                lineHeight: 1.6,
              }}
            >
              Empowering your learning journey with flexible, focused, and dynamic courses. Shape your future today.
            </Typography>

            <Button
              startIcon={<RocketLaunchIcon />}
              onClick={() => goTo("/publishcourse", true)}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                borderRadius: "16px",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#ffffff",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundSize: "200% auto",
                transition: "all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                boxShadow: isDark
                  ? `0 10px 30px ${alpha(theme.palette.primary.main, 0.3)}`
                  : `0 10px 30px ${alpha(theme.palette.primary.main, 0.2)}`,
                "&:hover": {
                  backgroundPosition: "right center",
                  transform: "translateY(-4px)",
                  boxShadow: isDark
                    ? `0 20px 40px ${alpha(theme.palette.primary.main, 0.5)}`
                    : `0 20px 40px ${alpha(theme.palette.primary.main, 0.3)}`,
                },
              }}
            >
              Start Teaching
            </Button>
          </Stack>

          {/* Quick Links */}
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
              Explore
            </Typography>
            <Stack spacing={2}>
              {footerLinks.map((link) => (
                <Typography
                  key={link.label}
                  component="button"
                  onClick={() => goTo(link.path, link.authRedirect)}
                  sx={{
                    textAlign: "left",
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                    color: "text.secondary",
                    fontSize: "1rem",
                    fontWeight: 600,
                    p: 0,
                    position: "relative",
                    width: "fit-content",
                    transition: "color 0.2s ease",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "0%",
                      height: "2px",
                      bottom: "-4px",
                      left: 0,
                      backgroundColor: theme.palette.primary.main,
                      transition: "width 0.3s ease",
                    },
                    "&:hover": {
                      color: "text.primary",
                      "&::after": {
                        width: "100%",
                      }
                    }
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Stack>

          {/* Highlights */}
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
              Why Learners Stay
            </Typography>
            <Stack spacing={2.5}>
              {highlights.map(({ icon: Icon, label }) => (
                <Stack
                  key={label}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    "&:hover .icon-box": {
                      transform: "scale(1.1) rotate(5deg)",
                      background: isDark
                        ? alpha(theme.palette.primary.main, 0.2)
                        : alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                >
                  <Box
                    className="icon-box"
                    sx={{
                      width: 42,
                      height: 42,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "12px",
                      color: theme.palette.primary.main,
                      background: isDark
                        ? alpha(theme.palette.primary.main, 0.1)
                        : alpha(theme.palette.primary.main, 0.05),
                      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    <Icon sx={{ fontSize: "1.3rem" }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.95rem" }}>
                    {label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>

        <Divider
          sx={{
            borderColor: isDark ? alpha("#ffffff", 0.1) : alpha("#000000", 0.05),
            mb: 4
          }}
        />

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", fontWeight: 500 }}>
            © {year} LearningOn. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            {[
              { icon: <TwitterIcon fontSize="small" />, label: "Twitter" },
              { icon: <LinkedInIcon fontSize="small" />, label: "LinkedIn" },
              { icon: <GitHubIcon fontSize="small" />, label: "GitHub" },
            ].map((social) => (
              <IconButton
                key={social.label}
                size="small"
                sx={{
                  color: "text.secondary",
                  background: isDark ? alpha("#ffffff", 0.05) : alpha("#000000", 0.03),
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: theme.palette.primary.main,
                    color: "#ffffff",
                    transform: "translateY(-3px)",
                  }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SiteFooter;
