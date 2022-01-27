import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ModalContainer, Modal} from "./style";
import {CloseIcon} from "../../pages/Constants";

class ModalWindow extends Component {
  render() {
    const {isOpen, closeModal, title, children, handleSave} = this.props
    return isOpen ? (
      <ModalContainer onClick={closeModal}>
        <Modal onClick={e => e.stopPropagation()}>
          <div
            className="flex justify-end mt-7 mr-7 cursor"
            dangerouslySetInnerHTML={{__html: CloseIcon}}
            onClick={closeModal}
          />
          <div className="px-10 flex-container overflow-hidden">
            <div className="font-bold text-2xl flex justify-center">
              {title}
            </div>
            {children}
            <div className="mb-12 mt-14 flex justify-center">
              <button
                className="grey btn width-m mr-4"
                onClick={closeModal}
              >
                Отмена
              </button>
              <button
                className="blue btn width-m"
                onClick={() => handleSave()}
              >
                Сохранить
              </button>
            </div>
          </div>
        </Modal>
      </ModalContainer>
    ) : "";
  }
}

ModalWindow.propTypes = {};

export default ModalWindow;