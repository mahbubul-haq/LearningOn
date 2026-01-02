import React, { Dispatch, SetStateAction, useCallback } from "react";
import VideoUpload from "../../components/videoUpload/VideoUpload";

type Props = {
    updateCallback: () => void;
    subLessonVideoLink: string;
    index: number;
    subIndex: number;
    handleInput: (event: { target: { name: string; value: string, value1?: number, name1?: string } }, index: number, subIndex?: number) => void;
    setVideoLinks: Dispatch<SetStateAction<string[]>>;
}

export default React.memo(function SubLessonVideoUploader({ updateCallback, subLessonVideoLink, index, subIndex, handleInput, setVideoLinks }: Props) {

    const setFileName = useCallback((fileName: string, duration?: number) => {
        const e = {
            target: {
                name: "videoLink",
                value: fileName,
                name1: duration ? "videoDuration" : "",
                value1: duration ? duration : 0,
            },
        };

        if (fileName) {
            setVideoLinks((prev: string[]) => [...prev, fileName]);

        } else {
            setVideoLinks((prev: string[]) => [...prev.filter((link: string) => link !== subLessonVideoLink)]);
            // setVideoLinks([
            //   ...videoLinks.filter(
            //     (link) => link !== subLesson.videoLink
            //   ),
            // ]);
        }

        handleInput(e, index, subIndex);
    }, [handleInput, index, subIndex, subLessonVideoLink]);

    return (
        <VideoUpload
            // id="sublesson-video"
            // name="videoLink"
            updateCallBack={updateCallback}
            fileName={subLessonVideoLink}
            setFileName={setFileName}
            isImage={false}
        />
    );
});