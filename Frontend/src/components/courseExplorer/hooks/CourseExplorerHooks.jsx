import { useInfiniteQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { CourseExplorerContext } from "../../../state/CourseExplorerContext"

export const useExplorerCourses = ({
    category,
    coursePerPage = 12,
}) => {
    const { getFilteredCourses } = useContext(CourseExplorerContext);

    return useInfiniteQuery({
        queryKey: ["explorer-courses", category],
        queryFn: ({ pageParam }) => getFilteredCourses({ page: pageParam || 1, coursePerPage, category }),
        getNextPageParam: (lastPage) => {
            if (lastPage.success) {
                return lastPage.nextPage;
            }
            return undefined;
        },
        staleTime: category === "" ? Infinity : 0,
        gcTime: category === "" ? 60 * 60 * 1000 : 0,
        enabled: Boolean(coursePerPage),
    })
}