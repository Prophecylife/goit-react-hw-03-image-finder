import React from 'react';
import { Component } from 'react';
import Button from 'components/Button/Button';
import * as ImageService from 'services/image-service';
import Searchbar from 'components/Searchbar/Searchbar';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
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
    let cleanText = text.trim().toLowerCase();
    if (cleanText === '' || cleanText === this.state.query) return;
    this.setState({ query: cleanText, images: [], page: 1 });
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
      <div className="App">
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
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}

        {isVisible && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
