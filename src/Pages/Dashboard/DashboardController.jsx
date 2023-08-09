import React, { useEffect, useState } from "react";
import DashboardUI from "./DashboardUI";
import { useDispatch } from "react-redux";
import { callApiAction } from "../../store/actions/commonAction";
import { getTrasactionApi } from "../../apis/trasaction.api";
import { LIST_VIEW_TIME, TRANSACTION_FETCH_TYPE, GRAPHICAL_VIEW_TYPE, GRAPHICAL_VIEW_DURATION, WEEK_DAYS } from "../../utils/constants";

const DashboardController = () => {
    const [age, setAge] = useState(10);
    const handleChange = (e) => {
        setAge(e.target.value);
    }
    const [loading, setLoading] = useState(false);
    const [graphDuraction, setGraphDuraction] = useState("WEEK_DAYS_DATA")
    const [expanseData, setExpanseData] = useState();
    const [weekGraphDayData, setWeekGraphDayData] = useState([]);
    const [monthGraphDayData, setMonthGraphDayData] = useState([]);
    const dispatch = useDispatch();
    const [GraphData, setGraphData] = useState([])
    // const GraphData = [
    // {
    //     "name": "Page A",
    //     "uv": 4000,
    //     "pv": 2400,
    //     "amt": 2400
    // },
    // {
    //     "name": "Page B",
    //     "uv": 3000,
    //     "pv": 1398,
    //     "amt": 2210
    // },
    // {
    //     "name": "Page C",
    //     "uv": 2000,
    //     "pv": 9800,
    //     "amt": 2290
    // },
    // {
    //     "name": "Page D",
    //     "uv": 2780,
    //     "pv": 3908,
    //     "amt": 2000
    // }
    // ]
    const PieChartData = [
        // { name: "Label 1", value: 30, fill: "#255F5B" },
        // { name: "Label 2", value: 25, fill: "#2C3E35" },
        // { name: "Label 3", value: 20, fill: "#497F76" },
        // { name: "Label 4", value: 15, fill: "#A7DDBC" }
    ]
    console.log(graphDuraction);
    const fetchTransaction = () => {
        setLoading(true)
        dispatch(callApiAction(
            async () => await getTrasactionApi({ transactionFetchType: TRANSACTION_FETCH_TYPE.LIST_VIEW, listViewTime: LIST_VIEW_TIME.ALL, pageSize: 10 }),
            (response) => {
                setExpanseData(response)
                setLoading(false)
            },
            (err) => {
                setLoading(false)
            }
        ))
    }
    const fetchTransactionForGraph = () => {
        setLoading(true)
        dispatch(callApiAction(
            async () => await getTrasactionApi({ transactionFetchType: TRANSACTION_FETCH_TYPE.GRAPHICAL_VIEW, listViewTime: LIST_VIEW_TIME.ALL, graphicalViewType: GRAPHICAL_VIEW_TYPE.NO_FILTER, graphicalViewDuration: graphDuraction }),
            (response) => {
                setGraphData(response.result)
                console.log(response.result);
                setLoading(false)
            },
            (err) => {
                console.log(err)
                setLoading(false)
            }
        ))
    }
    useEffect(() => {
        fetchTransaction();
    }, [])

    useEffect(() => {
        setWeekGraphDayData([]);
        setMonthGraphDayData([]);
        fetchTransactionForGraph();
    }, [graphDuraction])

    useEffect(() => {
        if (graphDuraction == "WEEK_DAYS_DATA") {
            GraphData.map((row, index) => {
                setWeekGraphDayData(weekGraphDayData => [...weekGraphDayData, {
                    amount: row.amount,
                    day: WEEK_DAYS[row._id.dayOfWeek],
                    key: index
                }])
            })
        }
        if (graphDuraction == "MONTH_DAYS_DATA") {
            GraphData.map((row, index) => {
                setMonthGraphDayData(monthGraphDayData => [...monthGraphDayData, {
                    amount: row.amount,
                    // day: WEEK_DAYS[row._id.dayOfWeek],   
                    key: index
                }])
                console.log(monthGraphDayData);
            })
        }
    }, [GraphData])
    return (
        <>
            <DashboardUI age={age} handleChange={handleChange} GraphData={GraphData} PieChartData={PieChartData} expanseData={expanseData} loading={loading} graphDuraction={graphDuraction} setGraphDuraction={setGraphDuraction} weekGraphDayData={weekGraphDayData} monthGraphDayData={monthGraphDayData} />
        </>
    )
}

export default DashboardController;