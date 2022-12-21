import { Component } from 'react';
import s from './Modal.module.css';

interface ModalProps {
  toggleModal: () => void;
  largeImage: string | null;
}

export default class Modal extends Component<ModalProps> {

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDownCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDownCloseModal);
  }

  onKeyDownCloseModal = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div className={s.overlay} onClick={this.props.toggleModal}>
        <div className={s.modal}>
          <img src={this.props.largeImage || ""} alt="" />
        </div>
      </div>
    );
  }
}
