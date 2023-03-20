import DataTable from "react-data-table-component-with-filter";
import {useEffect, useState} from "react";


import {userService} from "../Services/user.service";

const TableComponent = () => {

    let [users, setUsers] = useState([]);
    let [windowLocation, setWindowLocation] = useState('')

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

    useEffect(() => {
        userService.getAll().then(({data}) => setUsers(data))
    }, [])

    function handleFilter(data) {

        const paramsObj = { name: data.Name?.value, username: data.Username?.value };
        const searchParams = new URLSearchParams(paramsObj);

        let url = searchParams.toString()

        setWindowLocation(url)
    }
    function changeWindowLocation() {
        window.location.href = windowLocation
    }

    return (
        <div>
            <h1>Final project</h1>
            <button disabled={!windowLocation} onClick={changeWindowLocation}>Change window location</button>
            <DataTable
                pagination={true}
                paginationRowsPerPageOptions={[2, 4, 6, 8, 10]}
                paginationPerPage={2}
                columns={columns}
                responsive={true}
                data={users}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                onFilter={handleFilter}
            />
        </div>
    )
}

export {TableComponent};