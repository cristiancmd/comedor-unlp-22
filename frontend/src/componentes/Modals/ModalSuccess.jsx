import React, {useState, useEffect} from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const ModalSuccess = (props) => {
  const [show, setShow] = useState(false);
  const {url, message} = props;

  const handleClose = () => {
    props.another();
    setShow(false);
  }

  const handleBack = (e) => {
    setShow(false);
    e.preventDefault();
    window.location.assign(url);
  }

  useEffect(() => {
    if(props.showModal){
      setShow(true);
    }
  }, []);

  return (
    <>
      <Modal
        isOpen={show}
        onExit={handleClose}
        fade={false}
        autoFocus={true}
      >
        <ModalBody>
          <div className="mt-4 row justify-content-center">
            <div className="col text-center">
              <FontAwesomeIcon icon={faCheckCircle} color={"#6BC04B"} size="lg"/>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col text-center">
              <p className="mt-4">{message}</p>
            </div>
          </div>
          <div className="mt-4 row justify-content-around">
            <div className="col text-center">
              <Button className="btn btn-secondary" onClick={handleBack}>Volver</Button>
            </div>
            <div className="col text-center">
              <Button className="btn btn-primary" onClick={handleClose}>Cargar otro</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalSuccess