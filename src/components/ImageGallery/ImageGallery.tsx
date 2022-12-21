import { RotatingLines } from 'react-loader-spinner';
import { Image } from '../types/types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: Array<Image>;
  loading: boolean;
  setLargeImage: (index: number) => void;
  toggleModal: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({images, loading, setLargeImage, toggleModal}) => {
  return(
    <>
    <ul className={s.imageGallery}>
      {images.map(({ id, webformatURL }, index) => {
        return (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            setLargeImage={setLargeImage}
            index={index}
            toggleModal={toggleModal}
          />
        );
      })}
    </ul>
    {loading && (
      <div className={s.loader}>
        <RotatingLines
          strokeColor="blue"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    )}
  </>
  );
};

export default ImageGallery;
