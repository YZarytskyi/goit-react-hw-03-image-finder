import axios from 'axios';
import { Image } from '../components/types/types';

interface Response {
  total: number;
  totalHits: number;
  hits: Array<Image>;
}

export const pixabayApi = {
  fetchImages(keyword: string = "", page: number = 1) {
    return axios.get<Response>(
      `https://pixabay.com/api/?q=${keyword}&page=${page}&key=31488628-c834a527c2d0d1c920b3fe01a&image_type=photo&orientation=horizontal&per_page=12`
    );
  },
};
