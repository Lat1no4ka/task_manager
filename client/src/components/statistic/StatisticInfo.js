import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './statistic.scss'

export const StatisticInfo = () => {
    const { request } = useHttp();
    const id = useSelector((state) => state.auth.userId);
    const [userStatistic, setUserStatistic] = useState({})
    const [currentStatistic, setCurrentStatistic] = useState({})
    const [statistic, setStatistic] = useState([])
    const [statisticShow, setStatisticShow] = useState(false)
    const [users, setUsers] = useState([])

    const getUserStatistic = async () => {
        const userStatistic = await request("http://127.0.0.1:8080/getUserStat", "POST", JSON.stringify({ id }));
        setUserStatistic(userStatistic)
    }

    const getStatistic = async () => {
        const statistic = await request("http://127.0.0.1:8080/getFullStat", "GET");
        setStatistic(statistic)
    }

    const checkUser = async () => {
        const users = await request("http://127.0.0.1:8080/allUsers", "GET");
        const admin = users.filter((user) => {
            return id == user.id && user.role.roleName == 'admin' ? user : null
        })
        setUsers(users)
        if (admin.length) {
            setStatisticShow(true)
        }
    }

    const getCurrentStatistic = (id) => {
        const currentStatistic = statistic.filter((item) => {
            return item.user.id == id ? item : null
        })
        setCurrentStatistic(currentStatistic[0])
    }

    useEffect(() => {
        checkUser()
        getUserStatistic()
        getStatistic()
    }, [])

    if (userStatistic && !statisticShow) {
        return (
            <div className="container">
                <h1>Статистика</h1>
                <div className="d-flex flex-wrap">
                    <div className="col-12 col-xl-4">
                        <StatisticTable userStatistic={userStatistic} />
                    </div>
                    <div className="col-12 col-xl-8 chart">
                        <StatisticChart userStatistic={userStatistic} />
                    </div>
                </div>
            </div>
        )
    } else if (statistic.length && statisticShow && users && userStatistic) {
        return (
            <div className="container">
                <div className="d-flex flex-row block-header">
                    <div className="col-4">
                        <h1>Статистика</h1>
                    </div>
                    <div className="col-8">
                        <select className="custom-select" id="inputGroupSelect01"
                            onClick={e => getCurrentStatistic(e.target.value)}>
                            {
                                users.map((user) => {
                                    return <option key={user.id} value={user.id}>{user.userName}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    <div className="col-12 col-xl-4">
                        <StatisticTable userStatistic={Object.entries(currentStatistic).length ? currentStatistic : userStatistic} />
                    </div>
                    <div className="col-12 col-xl-8 chart">
                        <StatisticChart userStatistic={Object.entries(currentStatistic).length ? currentStatistic : userStatistic} />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container mt-2">
            <h1>Статистика</h1>
        </div>
    )


}

export const StatisticTable = (props) => {
    const userStatistic = props.userStatistic;
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td className="p-2 m-2">Новых задач</td>
                        <td className="p-2 m-2">{userStatistic.newTask}</td>
                    </tr>
                    <tr>
                        <td className="p-2 m-2">Задач в работе</td>
                        <td className="p-2 m-2">{userStatistic.workTask}</td>
                    </tr>
                    <tr>
                        <td className="p-2 m-2">Задач на проверке</td>
                        <td className="p-2 m-2">{userStatistic.checkTask}</td>
                    </tr>
                    <tr>
                        <td className="p-2 m-2">Задач возвращенных на доработку </td>
                        <td className="p-2 m-2">{userStatistic.revisionTask}</td>
                    </tr>
                    <tr>
                        <td className="p-2 m-2">Принятых задач</td>
                        <td className="p-2 m-2">{userStatistic.acceptedTask}</td>
                    </tr>
                    <tr>
                        <td className="p-2 m-2">Закрытых задач</td>
                        <td className="p-2 m-2">{userStatistic.closedTask}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export const StatisticChart = (props) => {
    const userStatistic = props.userStatistic;
    const data = [
        { name: 'Новые', uv: userStatistic.newTask },
        { name: 'В работе', uv: userStatistic.workTask },
        { name: 'На проверке', uv: userStatistic.checkTask },
        { name: 'На доработке', uv: userStatistic.revisionTask },
        { name: 'Принятые', uv: userStatistic.acceptedTask },
        { name: 'Закрытые', uv: userStatistic.closedTask },
    ];
    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="uv" barSize={30} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </ >
    )
}