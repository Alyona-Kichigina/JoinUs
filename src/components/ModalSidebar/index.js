import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, Modal } from "./style"
import {CloseIcon} from "../../pages/Constants";

class ModalSidebar extends Component {
    render() {
    const { closeModal, title, children, handleSave, isOpen } = this.props
    return isOpen && (
            <ModalContainer
                onClick={closeModal}
            >
                <Modal
                    onClick={e => e.stopPropagation()}
                >
                    <div>
                        <div className="flex justify-end mt-7 mr-7 cursor">
                            <div
                                dangerouslySetInnerHTML={{__html: CloseIcon}}
                                onClick={closeModal}
                            />
                        </div>
                        <div
                            className="font-bold text-2xl flex justify-center"
                        >
                            {title}
                        </div>
                        {children}
                    </div>
                    <div className="mb-12 mt-14 flex justify-around">
                        <button
                            className="grey btn width-m"
                            onClick={closeModal}
                        >
                            Отмена
                        </button>
                        <button
                            className="blue btn width-m"
                            onClick={handleSave}
                        >
                            Сохранить
                        </button>
                    </div>
                </Modal>
            </ModalContainer>
        );
    }
}

ModalSidebar.propTypes = {
    closeModal: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.func,
    handleSave: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ModalSidebar;