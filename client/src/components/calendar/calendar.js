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
        const tasks = await request(`${process.env.REACT_APP_API_URL}/getTasks`, "POST", JSON.stringify({ id: user.userId }))
        setEvent(tasks)
    }


    const setEvent = (tasks) => {
        let eventsList = tasks.map((task) => {
            return {
                title: task.taskName,
                start: task.begDate,
                end: task.endDate,
            }
        })
        eventsList.length ? setEventsList(eventsList) : setEventsList([{}])

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
                    style={{ height: 1000 }}
                />
            </div>
        )
    } else {
        return (
            <div>
                loading
            </div>
        )
    }
}