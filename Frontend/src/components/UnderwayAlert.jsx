import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

function UnderwayAlert() {
  const [open, setOpen] = React.useState(sessionStorage.getItem('firstTime') !== 'true');
  const handleClose = () => setOpen(false);

  const isMobibleScreens = useMediaQuery('(max-width: 600px)');

  return (
    <Box sx={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      // zIndex: open? 6000 : -1,
      visibility: open ? 'visible' : 'hidden',
      zIndex: open ? 6000 : -100,
    }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="underway-alert-title"
        aria-describedby="underway-alert-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: open ? 6002 : -100,
        }}
      >
        <Alert severity="info" onClose={handleClose} sx={{ width: isMobibleScreens? '90%' : '50%', fontSize: "1rem" }}>
          <AlertTitle sx={{
            fontSize: "1.1rem",
            fontWeight: "bold",
          
          }} id="underway-alert-title">Website Underway</AlertTitle>
          This website is still under development. Some features may not work as expected.

        </Alert>
      </Modal>
      <Backdrop open={open} />
    </Box>
  );
}

export default UnderwayAlert;
