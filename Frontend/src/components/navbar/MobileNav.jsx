import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { NotificationContext } from "../../state/NotificationContext";
import MobileNavBottom from "./MobileNavBottom";
import MobileNavTop from "./MobileNavTop";

const MobileNav = ({
    openDrawer,
    setOpenDrawer,
    setOpenNotificationDrawer,
    newNotifications
}) => {
    const { updateNotifications } = useContext(NotificationContext);

    return (
        <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            sx={{
               
                "& .MuiDrawer-paper": {
                    width: "100%",
                    maxWidth: "400px",
                },
                zIndex: 5000000,
            }}

        >
            <Box
                sx={{
                    padding: "0.5rem",
                    pb: "0",
                    // paddingLeft: "2rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    // border: "1px solid black",
                    alignItems: "center",
                }}
            >
                <IconButton onClick={() => setOpenDrawer(false)}>
                    <CloseIcon
                        sx={{
                            fontSize: "1.5rem",
                        }}
                    />
                </IconButton>
            </Box>

            <MobileNavTop
                setOpenDrawer={setOpenDrawer}
                setOpenNotificationDrawer={setOpenNotificationDrawer}
                newNotifications={newNotifications}
                updateNotifications={updateNotifications}
            />

            <MobileNavBottom
                setOpenDrawer={setOpenDrawer}
            />


        </Drawer>
    )
}

export default MobileNav