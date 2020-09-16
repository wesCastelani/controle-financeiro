import React from 'react';
import Modal from 'react-modal';

import css from './modal.module.css';

export default function ModalCtrl(props) {
  const { onSave, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div className={css.modalClass}>
          <div className={css.card}>
            <div>
              <div className={css.head}>
                <h4>Teste</h4>
                <button
                  onClick={handleClose}
                  className="waves-effect waves-light btn red darken-4"
                >
                  X
                </button>
              </div>
              <form>
                <div>
                  <div>
                    <label>
                      Despesa
                      <input type="radio" name="type" value="-" checked />
                    </label>
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <input type="submit"></input>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
