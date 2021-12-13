import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, Modal } from "./style";
import {CloseIcon} from "../../pages/Constants";

class ModalWindow extends Component {

    render() {
        const { isOpen, closeModal, title } = this.props
        return isOpen ? (
            <ModalContainer
                onClick={closeModal}
            >
                <Modal
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-end mt-7 mr-7 cursor">
                        <div
                            dangerouslySetInnerHTML={{__html: CloseIcon}}
                            onClick={closeModal}
                        />
                    </div>
                    <div
                        className="font-bold text-2xl flex justify-center"
                    >
                        { title }
                    </div>
                    CLOSE CLOSE CLOSE CLOSE
                    CLOSE CLOSE CLOSE CLOSE
                    CLOSE CLOSE CLOSE CLOSE
                    CLOSE CLOSE CLOSE CLOSE
                    <div className="mb-12 mt-14 flex justify-around">
                        <button
                            className="grey btn width-m"
                            onClick={closeModal}
                        >
                            Отмена
                        </button>
                        <button
                            className="blue btn width-m"
                        >
                            Сохранить
                        </button>
                    </div>
                </Modal>
            </ModalContainer>
        ) : "";
    }
}

ModalWindow.propTypes = {};

export default ModalWindow;