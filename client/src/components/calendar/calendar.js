import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook"
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss';
const localizer = momentLocalizer(moment)

export const Calendar = (props) => {
    const user = useSelector((state) => state.auth);
    const { request } = useHttp();
    const [eventsList, setEventsList] = useState([])


    const getTasks = async () => {
        const tasks = await request("http://127.0.0.1:8080/getTasks", "POST", JSON.stringify({ id: user.userId }))
        setEvent(tasks)
    }


    const setEvent = (tasks) => {
        console.log(tasks)
        let eventsList = tasks.map((task) => {
            return {
                title: task.taskName,
                start: task.begDate,
                end: task.endDate,
            }
        })
        setEventsList(eventsList)
        
    }
    useEffect(() => {
        getTasks()
    }, [])

    if (eventsList.length) {
        return (
            <div>
                <BigCalendar
                    localizer={localizer}
                    events={eventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 1000 }}
                />
            </div>
        )
    } else {
        return(
            <div>
                loading
            </div>
        )
    }
}