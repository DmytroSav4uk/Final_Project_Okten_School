import DataTable from "react-data-table-component-with-filter";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {paidActions} from "../redux/slices/paid.slice";


const TableComponent = () => {


    const ExpandedComponent = ({data}) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            filterable: true,
        },

        {
            name: 'Surname',
            selector: row => row.surname,
            sortable: true,
            filterable: true,
        },

        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
            filterable: true,
        },

        {
            name: 'Course',
            selector: row => row.course,
            sortable: true,
            filterable: true,
        },

        {
            name: 'Course Format',
            selector: row => row.courseFormat,
            sortable: true,
            filterable: true,
        },

        {
            name: 'Course Type',
            selector: row => row.courseType,
            sortable: true,
            filterable: true,
        },

        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            filterable: true
        }
    ];


    const {paidArr} = useSelector(state => state.paidReducer);
    let {firstPage} = useSelector(state => state.paidReducer)
    let {currentPage} = useSelector(state => state.paidReducer)
    let dispatch = useDispatch()


    useEffect(() => {
        dispatch(paidActions.getAllPaid(firstPage))
    }, [dispatch, firstPage])


    function getNextPage() {
        currentPage ++
        dispatch(paidActions.getAllPaid(currentPage))
    }

    function getPreviousPage() {
        currentPage--
        dispatch(paidActions.getAllPaid(currentPage))
    }

    return (
        <div>
            <h1>Final project</h1>
            <div>
                <DataTable
                    columns={columns}
                    responsive={true}
                    data={paidArr.content}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />
            </div>
            <div  style={{display:"flex"}}>
                <button disabled={currentPage === 1} onClick={getPreviousPage}>Previous</button>
                <p>{currentPage}</p>
                <button disabled={currentPage === 16} onClick={getNextPage}>Next</button>
            </div>
        </div>
    )
}

export {TableComponent};