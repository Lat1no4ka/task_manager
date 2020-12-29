import "./detail.scss";
export const DetailTask = (props) => {
  const data = props.data;
  return (
    <div className={"modal-window"}>
      <div className="container p-5 ">
        <div>
          <h3>{data.title}</h3>
        </div>
        <div>
          <h4>Описание: {data.description}</h4>
        </div>
        <div>
          <p>Дата начала: {data.date_of_begin}</p>
        </div>
        <div>
          <p>Дата окончания: {data.date_of_end}</p>
        </div>
        <div>
          <p>Участники: {data.members}</p>
        </div>
        <div>
          <p>Приоритет: {data.priority}</p>
        </div>
        <div>
          <p>Статус: {data.position}</p>
        </div>
      </div>
    </div>
  );
};
