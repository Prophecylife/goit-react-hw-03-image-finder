import { Component } from 'react';
import Button from 'components/Button/Button';
import * as ImageService from 'services/image-service';
import s from './ImageGallery.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    isVisible: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
    isLoading: false,
  };

  componentDidMount() {
    const { page, query } = this.state;
    query !== '' && this.getImages(page, query);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.getImages(page, query);
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getImages = async (query, page) => {
    this.setState({ isLoading: true });
    await ImageService.getImages(page, query).then(({ hits, totalHits }) => {
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isVisible: this.state.page < Math.ceil(totalHits / 12),
      }));
    });
    this.setState({ isLoading: false });
  };

  handleFormSubmit = text => {
    if (text === '' || text === this.state.query) return;
    this.setState({ query: text, images: [], page: 1 });
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL, tags: tags });
  };

  render() {
    const {
      isVisible,
      showModal,
      images,
      query,
      largeImageURL,
      tags,
      isLoading,
    } = this.state;

    return (
      <>
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.toggleModal}
          ></Modal>
        )}
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleFormSubmit} />

        {query.length > 0 && (
          <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                onClick={() => this.toggleModal(largeImageURL, tags)}
              />
            ))}
          </ul>
        )}

        {isVisible && <Button onClick={this.onLoadMore} />}
      </>
    );
  }
}
