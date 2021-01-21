import "./detail.scss";
export const DetailTask = (props) => {
  const data = props.data;
  return (
    <div className={"modal-window"}>
      <div className="container p-5 ">
        <div>
          <h3>{data.taskname}</h3>
        </div>
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
          <p>Участники: {data.empid}</p>
        </div>
        <div>
          <p>Приоритет: {data.taskpriority}</p>
        </div>
        <div>
          <p>Статус: {data.taskstatus}</p>
        </div>
        <div>
          <p>Задание назначил: {data.headid}</p>
        </div>
      </div>
    </div>
  );
};
