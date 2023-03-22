import DataTable from "react-data-table-component-with-filter";
import {useEffect, useState} from "react";
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
            name: 'Username',
            selector: row => row.username,
            sortable: true,
            filterable: true
        },

        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        }
    ];


    const {paidArr} = useSelector(state => state.paidReducer);
    let dispatch = useDispatch()




    useEffect(() => {
    dispatch(paidActions.getAllPaid())
    }, [])

    return (
        <div>
            <h1>Final project</h1>
            <DataTable
                pagination={true}
                paginationRowsPerPageOptions={[2, 4, 6, 8, 10]}
                paginationPerPage={2}
                columns={columns}
                responsive={true}
                data={paidArr.content}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    )
}

export {TableComponent};