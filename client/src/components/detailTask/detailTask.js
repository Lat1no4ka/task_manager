import "./detail.scss";
import { Modal } from "react-bootstrap";

export const DetailSubTaskCreate = (props) => {
  const data = props.data;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{data.taskname}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <h4>Описание: {data.taskdesc}</h4>
        </div>
        <div>
          <p>Дата начала: {data.begdate}</p>
        </div>
        <div>
          <p>Дата окончания: {data.expdate}</p>
        </div>
        <div>
          <p>Исполнитель: {data.executor.userName}</p>
        </div>
        <div>
          <p>Приоритет: {data.prioDir.prioname}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const DetailTask = (props) => {
  const data = props.data;
  { console.log(data) }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{data.taskname}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h4>Описание: {data.taskdesc}</h4>
        </div>
        <div>
          <p>Дата начала: {data.begdate}</p>
        </div>
        <div>
          <p>Дата окончания: {data.expdate}</p>
        </div>
        <div>
          <p>Исполнитель: {data.emp.userName}</p>
        </div>
        <div>
          <p>Приоритет: {data.priority.prioname}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
