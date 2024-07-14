import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../state/AdminContext";

const UnpublishedCourses = () => {
  const { data, adminToken, setData } = useContext(AdminContext);
  const navigate = useNavigate();

  const updateStatus = async (courseId, index) => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/updateCourseStatus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": adminToken,
          },
          body: JSON.stringify({
            courseId: courseId,
            status: "published",
          }),
        }
      );

      res = await res.json();
      console.log(res);
      if (res.success) {
        setData((data) =>
          data.map((course, i) => {
            if (i == index) {
              return {
                ...course,
                courseStatus: "published",
              };
            } else return course;
          })
        );
      }
    } catch (err) {
      //
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {data?.map((course, index) => {
        return (
          <Card key={index}>
            <CardContent
              sx={{
                p: "1rem",
                display: "flex",
                gap: "1rem",
              }}
            >
              <CardMedia
                sx={{
                  width: "50px",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                  borderRadius: "0.25rem",
                }}
                component="img"
                image={`https://res.cloudinary.com/${
                  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                }/image/upload/${course.courseThumbnail}`}
              ></CardMedia>
              <Box>
                <Typography
                  component="a"
                  variant="h5"
                  href={`${import.meta.env.VITE_CLIENT_URL}/course/${
                    course._id
                  }`}
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                    fontWeight: "600",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "inherit",
                    },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/course/${course._id}`);
                  }}
                >
                  {course.courseTitle}
                </Typography>
                <Typography>{course?.owner.name}</Typography>
              </Box>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                p: "1rem",
              }}
            >
              <Button
                onClick={() => {
                  if (course.courseStatus === "published") return;

                  updateStatus(course._id, index);
                }}
                disableElevation
                variant="contained"
                color="success"
                disabled={course.courseStatus === "published"}
              >
                {course.courseStatus == "published" ? "Approved" : "Approve"}
              </Button>
              <Button disableElevation variant="outlined" color="error">
                Delete
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};

export default UnpublishedCourses;
