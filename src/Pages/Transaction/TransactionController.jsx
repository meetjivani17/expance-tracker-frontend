import React, { useEffect, useState } from "react";
import TransactionUI from "./TransactionUI";
import { openModal, closeModal } from "../../store/actions/modalAction";
import { useDispatch } from "react-redux";
import AddExpanceController from "./AddExpance/AddExpanceController";
import UpdateExpanceController from "./UpdateExpance/UpdateExpanceController"
import AddCategoryController from "./AddCategory/AddCategotyController";
import { callApiAction } from "../../store/actions/commonAction";
import { getCategoryApi } from "../../apis/category.api";

const TransactionController = () => {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [expanseData, setExpanseData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 8, 9]);
    const [categorydata, setCategoryData] = useState({});
    const [filters, setFilters] = useState({
        pageNo: 1,
        pageSize: 10,
        search: "",
        role: null,
        searchable: ["name", "email"],
    });
    const dispatch = useDispatch();
    const addNewExpanceModal = () => {
        dispatch(
            openModal({
                title: "Add New Expance",
                component: <AddExpanceController />,
                size: "sm"
            }
            )
        );
    }
    const updateExpance = () => {
        dispatch(
            openModal({
                title: "Update Expance",
                component: <UpdateExpanceController />,
                size: "sm"
            })
        )
    }
    const AddCategory = () => {
        dispatch(
            openModal({
                title: "Add Category",
                component: <AddCategoryController />,
                size: "sm"
            })
        )
    }
    const fetchList = () => {
        setLoading(true)
        dispatch(callApiAction(
            async () => await getCategoryApi(),
            (response) => {
                setCategoryData(response)
                console.log(categorydata);
                setLoading(false)
            },
            (err) => {
                console.log(err)
                setLoading(false)
            }
        ))
    }
    useEffect(() => {
        fetchList();
    }, [])

    return (
        <>
            <TransactionUI date={date} setDate={setDate} expanseData={expanseData} filters={filters} setFilters={setFilters} addNewExpanceModal={addNewExpanceModal} updateExpance={updateExpance} AddCategory={AddCategory} />
        </>
    )
}

export default TransactionController;