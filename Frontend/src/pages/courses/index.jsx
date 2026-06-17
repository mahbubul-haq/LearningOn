import { Box } from '@mui/material'
import { useContext, useEffect, useMemo } from 'react'
import CourseExplorerRIghtBottom from '../../components/courseExplorer/CourseExplorerRIghtBottom'
import CourseExplorerRightTop from '../../components/courseExplorer/CourseExplorerRightTop'
import SiteFooter from '../../components/SiteFooter'
import { CourseExplorerContext } from '../../state/CourseExplorerContext'
import { GlobalContext } from '../../state/GlobalContext'
import { useExplorerCourses } from '../../components/courseExplorer/hooks/CourseExplorerHooks'

const Courses = () => {

  const { setOpenedItem } = useContext(GlobalContext);
  const { setCoursePageOpened, selectedCategory, selectedSubCategory } = useContext(CourseExplorerContext);
  const { data: explorerCourses, hasNextPage: hasMorePages, fetchNextPage: fetchMoreCourses, isLoading: isLoadingCourses, isFetching: isFetchingCourses, isError: isErrorCourses, error: errorCourses, refetch: refetchCourses } = useExplorerCourses({
    category: selectedSubCategory || selectedCategory || "",
    coursePerPage: 15
  });

  const filteredCourses = useMemo(() => {
    if (!explorerCourses) return [];
    return explorerCourses.pages.flatMap((page) => page.courses);
  }, [explorerCourses]);

  const totalDocuments = useMemo(() => {
    return explorerCourses?.pages?.[0]?.totalDocuments || 0;
  }, [explorerCourses]);

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
      <CourseExplorerRightTop coursePage={true} totalDocuments={totalDocuments} filteredCourses={filteredCourses} />
      <CourseExplorerRIghtBottom totalDocuments={totalDocuments} filteredCourses={filteredCourses} loading={isLoadingCourses || isFetchingCourses} isError={isErrorCourses} coursePerPage={15} fetchNextPage={fetchMoreCourses} hasNextPage={hasMorePages} refetchCourses={refetchCourses} />

      <Box sx={{ width: "100%", height: "15rem" }}></Box>
      <SiteFooter />
    </Box>
  )
}

export default Courses
