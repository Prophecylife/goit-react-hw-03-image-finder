import { Component } from 'react';
import Button from 'components/Button/Button';
import * as ImageService from 'services/image-service';
import s from './ImageGallery.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { Bars } from 'react-loader-spinner';

export class ImageGallery extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    isVisible: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidMount() {
    const { page, query } = this.state;
    query !== '' && this.getImages(page, query);
    console.log('did mount');
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

  getImages = (query, page) => {
    ImageService.getImages(page, query).then(({ hits, totalHits }) => {
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isVisible: this.state.page < Math.ceil(totalHits / 12),
      }));
    });
  };

  handleFormSubmit = text => {
    this.setState({ query: text, images: [], page: 1 });
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL, tags: tags });
  };

  render() {
    const { isVisible, showModal, images, query, largeImageURL, tags } =
      this.state;

    return (
      <>
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            alt={tags}
            onClose={this.toggleModal}
          ></Modal>
        )}

        <Searchbar onSubmit={this.handleFormSubmit} />
        <Bars
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
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
