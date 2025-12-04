import { Box } from '@mui/material'
import { useContext, useEffect } from 'react'
import CourseExplorerRIghtBottom from '../../components/courseExplorer/CourseExplorerRIghtBottom'
import CourseExplorerRightTop from '../../components/courseExplorer/CourseExplorerRightTop'
import { CourseExplorerContext } from '../../state/CourseExplorerContext'
import { GlobalContext } from '../../state/GlobalContext'

const Courses = () => {

    const {setOpenedItem} = useContext(GlobalContext);
    const {setCoursePageOpened} = useContext(CourseExplorerContext);


    useEffect(() => {
        setOpenedItem("courses");

        setCoursePageOpened(true);

        return () => {
          setCoursePageOpened(false);
        }

    }, []);

    

  return (
    <Box sx={{
        maxWidth: "2000px",
        mx: "auto",
        
    }}>
        <CourseExplorerRightTop coursePage={true} />
        <CourseExplorerRIghtBottom />
    </Box>
  )
}

export default Courses