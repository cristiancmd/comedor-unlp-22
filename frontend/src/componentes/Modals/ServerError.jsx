import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ServerError(props) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    props.setError(false);
    props.handleError();
  };

  useEffect(() => {
    if (props.showError) {
      setShowModal(true);
    }
  }, []);

  return (
    <Modal
      isOpen={showModal}
      onExit={closeModal}
      fade={false}
      autoFocus={true}
    >
      <ModalBody>
        <div className="mt-4 row justify-content-center">
          <div className="col text-center">
            <FontAwesomeIcon icon={faTimesCircle} color={"#FF0000"} size="lg" />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col text-center">
            <p className="mt-4">{props.message}</p>
          </div>
        </div>
        <div className="mt-4 row justify-content-around">
          <div className="col text-center">
            <Button className="btn btn-primary" onClick={closeModal}>Entendido</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
