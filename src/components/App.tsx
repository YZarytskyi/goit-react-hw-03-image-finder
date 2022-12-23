import { Component } from 'react';
import { Notify } from 'notiflix';
import { pixabayApi } from '../api/api';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { Image } from './types/types';
import s from './App.module.css';

interface AppState {
  images: Array<Image>;
  totalImages: number | null;
  page: number;
  loading: boolean;
  showModal: boolean;
  largeImage: string | null;
  keyword: string;
}

export default class App extends Component<{}, AppState> {
  state = {
    images: [],
    totalImages: null,
    page: 1,
    loading: false,
    showModal: false,
    largeImage: null,
    keyword: '',
  };

  componentDidUpdate(prevProps: any, prevState: AppState): void {
    const prevKeyword = prevState.keyword;
    const nextKeyword = this.state.keyword;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const isUpdate = prevKeyword !== nextKeyword || prevPage !== nextPage;
    if (isUpdate) {
      this.fetchImages(nextKeyword, nextPage)
    }
  }

  fetchImages = (nextKeyword: string, nextPage: number) => {
    pixabayApi
    .fetchImages(nextKeyword, nextPage)
    .then(({ data }) => {
      if (!data.hits.length) {
        Notify.failure('Images not found');
        this.clearStateImages();
        return;
      }
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        totalImages: data.total,
      }));
    })
    .catch(err => console.log(err.message))
    .finally(() =>
    this.setState({
      loading: false,
    })
    );
  }

  getImagesByKeyword = (keyword: string) => {
    keyword = keyword?.trim().toLowerCase();
    if (!keyword) {
      Notify.failure('Please enter something');
      this.clearStateImages();
      return;
    }
    this.setState({
      images: [],
      totalImages: null,
      loading: true,
      page: 1,
      keyword: keyword,
    });
  };

  loadMoreImages = () => {
    this.setState(({ page }) => ({
      loading: true,
      page: page + 1,
    }));
  };

  clearStateImages = () => {
    this.setState({
      images: [],
      totalImages: null,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setLargeImage = (index: number) => {
    this.setState(({ images }) => ({
      largeImage: images[index].largeImageURL,
    }));
  };

  render() {
    const { images, largeImage, loading, page, showModal, totalImages } =
      this.state;
    const hasMoreImages = totalImages! > page * 12;
    return (
      <div className={s.app}>
        <Searchbar getImagesByKeyword={this.getImagesByKeyword} />
        <ImageGallery
          images={images}
          loading={loading}
          setLargeImage={this.setLargeImage}
          toggleModal={this.toggleModal}
        />
        {showModal && (
          <Modal toggleModal={this.toggleModal} largeImage={largeImage} />
        )}
        {hasMoreImages && <Button loadMoreImages={this.loadMoreImages} />}
      </div>
    );
  }
}
