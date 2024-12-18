import { useEffect, useState } from "react";
import { getImages } from "../../api/quizApi";
import Strings from "../../utils/strings";
import { ImageSearchStyling } from "../../components/styles/ImageSearch.styed";
import ImageUpload from "./ImageUpload";

interface imageSearchProps {
  searchTerm: any;
}

const ImageSearch = ({ searchTerm }: imageSearchProps) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const handleSearch = async () => {
      const pageNum = Math.floor(Math.random() * 25);
      if (/[a-zA-Z]/.test(searchTerm)) {
        const res = await getImages(pageNum, searchTerm);
        if (res.length) {
          setError(false);
          setImages(res);
        } else {
          setError(true);
        }
      }
    };

    handleSearch();
  }, [searchTerm]);

  return (
    <ImageSearchStyling>
      {error ? (
        <>
        <h2>{Strings.ImageSearch.text.error}</h2>
        <ImageUpload/>
        </>
        
      ) : (
        <section className="image-container">
          {images.map((image: any) => (
            <img
              key={image.id}
              src={image.urls.small}
              width={190}
              height={190}
              alt={image.alt_description}
            />
          ))}
        </section>
      )}
    </ImageSearchStyling>
  );
};

export default ImageSearch;
