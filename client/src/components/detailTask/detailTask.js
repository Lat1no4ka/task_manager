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
        <Modal.Title>{data.taskName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <h4>Описание: {data.taskDesc}</h4>
        </div>
        <div>
          <p>Дата начала: {data.begDate}</p>
        </div>
        <div>
          <p>Дата окончания: {data.endDate}</p>
        </div>
        <div>
          <p>Исполнитель: {data.employee.userName}</p>
        </div>
        <div>
          <p>Приоритет: {data.priority.priorityName}</p>
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
        <Modal.Title>{data.taskName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h4>Описание: {data.taskDesc}</h4>
        </div>
        <div>
          <p>Дата начала: {data.begDate}</p>
        </div>
        <div>
          <p>Дата окончания: {data.endDate}</p>
        </div>
        <div>
          <p>Исполнитель: {data.employee.userName}</p>
        </div>
        <div>
          <p>Приоритет: {data.priority.priorityName}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
