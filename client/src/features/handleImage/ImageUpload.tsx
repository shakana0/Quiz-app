import { useEffect, useRef, useState } from "react";
import Strings from "../../utils/strings";
import { ImageUploadStyling } from "../../components/styles/ImageUpload.styled";
import UploadIcon from "@mui/icons-material/Upload";
import DoneIcon from "@mui/icons-material/Done";

interface imageUploadProps {
  setSelectedImg: (selectedImg: string) => void;
}

const ImageUpload = ({ setSelectedImg }: imageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [showDone, setShowDone] = useState<string>("hide-icon");

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  useEffect(() => {
    selectedImage?.type?.includes("image/") ? setError(false) : setError(true);
    setShowDone("hide-icon");
  }, [selectedImage]);

  const handleImageUpload = () => {
    setErrorText(error ? Strings.ImageUpload.text.error : "");
    if (error) {
      setSelectedImage(null);
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.name = "";
        inputRef.current.type = "file";
      }
    }
    !error ? setShowDone("done-icon") : setShowDone("hide-icon");
    setSelectedImg(selectedImage);

    // const blobData = new Blob([selectedImage], { type: selectedImage.type });
    // const formData = new FormData();
    // const hej = formData.append("images", blobData, selectedImage.name);

    // console.log("formData ", hej, blobData);
    // console.log(formData.append("images", blobData, selectedImage.name))
  };

  return (
    <ImageUploadStyling>
      <label>{Strings.ImageUpload.text.lableText}</label>
      <p className="error-text">{errorText}</p>
      <section>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleImageChange}
          accept="image/*"
          ref={inputRef}
          className="add-file-input"
        />
        <button className="add-file-btn" onClick={handleImageUpload}>
          {Strings.createQuizPage.buttons.upload}
          <UploadIcon />
        </button>
        <DoneIcon className={showDone} />
      </section>
    </ImageUploadStyling>
  );
};

export default ImageUpload;
