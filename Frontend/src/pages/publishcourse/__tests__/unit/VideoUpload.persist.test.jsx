import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoUpload from "../../../../components/videoUpload/VideoUpload";

vi.mock("../../../../api/apiFetch", () => ({
  apiFetch: vi.fn(),
}));

vi.mock("../../../../components/videoUpload/VideoUploadDropzone", () => ({
  default: ({ uploadVideo }) => (
    <div>
      <input
        type="file"
        data-testid="file-input"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadVideo(file);
        }}
      />
    </div>
  ),
}));

vi.mock("../../../../components/videoUpload/VideoUploadedFile", () => ({
  default: ({ deleteVideo, fileName }) => (
    <div>
      <span data-testid="uploaded-file">{fileName}</span>
      <button type="button" onClick={() => deleteVideo(fileName)}>
        Delete Video
      </button>
    </div>
  ),
}));

vi.mock("../../../../components/videoUpload/VideoUploadProgress", () => ({
  default: () => <div data-testid="upload-progress" />,
}));

describe("VideoUpload with uploadHandler (unit)", () => {
  const setFileName = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls uploadHandler and does not call updateCallBack", async () => {
    const uploadHandler = vi.fn().mockResolvedValue({
      success: true,
      fileName: "learningon/videos/persisted",
      videoDuration: 100,
    });
    const updateCallBack = vi.fn();

    render(
      <VideoUpload
        updateCallBack={updateCallBack}
        uploadHandler={uploadHandler}
        setFileName={setFileName}
        fileName=""
        isImage={false}
      />
    );

    const file = new File(["video-bytes"], "clip.mp4", { type: "video/mp4" });
    await userEvent.upload(screen.getByTestId("file-input"), file);

    await waitFor(() => {
      expect(uploadHandler).toHaveBeenCalled();
    });

    expect(setFileName).toHaveBeenCalledWith(
      "learningon/videos/persisted",
      100
    );
    expect(updateCallBack).not.toHaveBeenCalled();
  });

  it("shows success snackbar after persisted upload", async () => {
    const uploadHandler = vi.fn().mockResolvedValue({
      success: true,
      fileName: "learningon/images/thumb",
    });

    render(
      <VideoUpload
        uploadHandler={uploadHandler}
        setFileName={setFileName}
        fileName=""
        isImage={true}
      />
    );

    await userEvent.upload(
      screen.getByTestId("file-input"),
      new File(["img"], "t.png", { type: "image/png" })
    );

    await waitFor(() => {
      expect(
        screen.getByText("File uploaded successfully!")
      ).toBeInTheDocument();
    });
  });

  it("deleteHandler clears file via persisted delete path", async () => {
    const deleteHandler = vi.fn().mockResolvedValue({ success: true });

    render(
      <VideoUpload
        uploadHandler={vi.fn()}
        deleteHandler={deleteHandler}
        setFileName={setFileName}
        fileName="learningon/videos/old"
        isImage={false}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /Delete Video/i }));

    await waitFor(() => {
      expect(deleteHandler).toHaveBeenCalled();
      expect(setFileName).toHaveBeenCalledWith("");
    });
  });
});
