import styles from './Dashboard.module.css';

// import tasksService from '../../services/tasksService'

// components
import { Calendar as CalendarIcon, List } from 'react-feather';
import { Calendar } from "react-calendar";

// hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

// Redux
// import { getUserDetails } from "../../slices/userSlice";
import { getUserTasks } from "../../slices/taskSlice";

import PieChart from "highcharts-react-official";

import Highcharts from "highcharts/highstock";


const Dashboard = () => {

    const userLocalStorage = localStorage.getItem("user");
    const localStorageId = JSON.parse(userLocalStorage)
    const id = localStorageId._id


    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const {
        tasks,
    } = useSelector((state) => state.tasks);

    // Calendar
    const [showCalendar, setShowCalendar] = useState(false);

    const [date, setDate] = useState(new Date());

    const taskDate = new Date(date).toDateString();

    const taskDay = date.getDate()

    const taskMonth = date.getMonth() + 1

    const tasksFiltered = tasks.filter((task) =>
        task.taskDate === taskDate
    )



    // Load user data
    // useEffect(() => {
    //     dispatch(getUserDetails(id));
    // }, [dispatch]);

    useEffect(() => {
        dispatch(getUserTasks(id));
    }, [dispatch]);


    const showCalendarModal = () => {

        if (showCalendar === false) {
            setShowCalendar(true)
        }

        else {
            setShowCalendar(false)
        }



    }
    const handleChange = (e) => {

        setShowCalendar(false)

        setDate(e)
        console.log(date)
    }

    // Chart

    const tasksPending = tasks.filter((task) => task.taskStatus === "Pendente")

    const tasksFinished = tasks.filter((task) => task.taskStatus === "Concluída")





    const options = {
        chart: {
            backgroundColor: null,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Tarefas',
            align: 'center',
            style: {
                color: "#fff",
                fontSize: "30px",
                fontFamily: "roboto",
                fontWeight: "bold",
                fontStyle: "italic",


            }
        },
        series: [
            {
                name: 'QTD',
                colorByPoint: true,
                data: [
                    {
                        name: "Pendentes",
                        y: tasksPending.length,
                        color: "rgb(213, 213, 16)"
                    },
                    {
                        name: "Concluídas",
                        y: tasksFinished.length,
                        color: "rgb(17, 57, 17)"
                    }
                ],
                style: { color: "#fff" }
            },
        ],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderColor: null,
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,

            }
        },
        legend: {
            itemStyle: {
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'uppercase'
            }
        },
        credits: {
            enabled: false
        }

    }





    if (loading) {
        return <p>Carregando...</p>;
    }


    return (

        <div>
            <div className={styles.container}>
                <div>
                    <p className={styles.p}>Olá, {user.name}!</p>
                </div>

                <div className={styles.tag}>
                    <p>Tasks Overview </p>
                </div>
                <div className={styles.tasks_count}>
                    <div className={styles.tasks}>
                        <a href="/tasks">
                            <span><p>{tasks.length}</p></span>
                            <List />
                        </a>
                    </div>
                </div>
                <div className={styles.graphic_container}>
                    <PieChart highcharts={Highcharts} options={options} />
                </div>
            </div>
        </div >
    )
}

export default Dashboard