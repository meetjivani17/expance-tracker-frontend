import React, { useEffect, useState } from "react";
import TransactionUI from "./TransactionUI";
import { openModal, closeModal } from "../../store/actions/modalAction";
import { useDispatch } from "react-redux";
import AddExpanceController from "./AddExpance/AddExpanceController";
import UpdateExpanceController from "./UpdateExpance/UpdateExpanceController"
import AddCategoryController from "./AddCategory/AddCategotyController";
import { callApiAction } from "../../store/actions/commonAction";
import { getCategoryApi, deleteCategoryApi } from "../../apis/category.api";
import UpdateCategoryController from "./UpdateCategory/UpdateCategoryController";
import DeleteConfirmation from "../../components/layouts/common/DeleteConfirmation";

const TransactionController = () => {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [expanseData, setExpanseData] = useState([]);
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
    const fetchList = () => {
        setLoading(true)
        dispatch(callApiAction(
            async () => await getCategoryApi(),
            (response) => {
                setCategoryData(response)
                console.log(response);
                setLoading(false)
            },
            (err) => {
                console.log(err)
                setLoading(false)
            }
        ))
    }
    const AddCategory = () => {
        dispatch(
            openModal({
                title: "Add Category",
                component: <AddCategoryController />,
                size: "sm"
            })
        )
        fetchList();
    }
    const updateCategory = (row) => {
        dispatch(
            openModal({
                title: "Update Category",
                component: <UpdateCategoryController row={row} />,
                size: "sm"
            })
        )
    }

    const deleteCategory = (id) => {
        dispatch(callApiAction(
            async () => await deleteCategoryApi({ id: id }),
            (response) => {
                setLoading(false)
                window.location.reload(true);
            },
            (err) => {
                console.log(err)
                setLoading(false)
            }
        ))
        // setDeletId(id);
        // dispatch(
        //     openModal({
        //         title: "Delete Expense",
        //         component: <DeleteConfirmation setDeleteC={setDeleteC} />,
        //         size: "sm"
        //     })
        // )
    }
    useEffect(() => {
        fetchList();
    }, [])

    return (
        <>
            <TransactionUI loading={loading} date={date} setDate={setDate} expanseData={expanseData} filters={filters} setFilters={setFilters} addNewExpanceModal={addNewExpanceModal} updateExpance={updateExpance} AddCategory={AddCategory} categorydata={categorydata} updateCategory={updateCategory} deleteCategory={deleteCategory} />
        </>
    )
}

export default TransactionController;