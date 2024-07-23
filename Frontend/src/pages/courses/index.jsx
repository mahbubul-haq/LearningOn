import { Box } from '@mui/material'
import { useContext, useEffect } from 'react'
import CourseExplorerRIghtBottom from '../../components/courseExplorer/CourseExplorerRIghtBottom'
import CourseExplorerRightTop from '../../components/courseExplorer/CourseExplorerRightTop'
import { GlobalContext } from '../../state/GlobalContext'

const Courses = () => {

    const {setOpenedItem} = useContext(GlobalContext);

    useEffect(() => {
        setOpenedItem("courses");
    }, []);

  return (
    <Box>
        <CourseExplorerRightTop coursePage={true} />
        <CourseExplorerRIghtBottom />
    </Box>
  )
}

export default Courses