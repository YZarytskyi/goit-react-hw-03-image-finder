import s from './ImageGallery.module.css';

interface ImageGalleryItemProps {
  image: string;
  index: number;
  setLargeImage: (index: number) => void;
  toggleModal: () => void;
}

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  image,
  index,
  setLargeImage,
  toggleModal,
}) => {
  const onClickOpenModal = (e: React.MouseEvent<HTMLLIElement>) => {
    toggleModal();
    setLargeImage(index);
  };

  return (
    <li className={s.imageGalleryItem} onClick={onClickOpenModal}>
      <img src={image} alt="" className={s.imageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;
