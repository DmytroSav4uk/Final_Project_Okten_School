import DataTable from "react-data-table-component-with-filter";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {paidActions} from "../redux/slices/paid.slice";
import css from "../css/table.module.css";

const TableComponent = () => {

    const {register, handleSubmit} = useForm({
        mode: 'onChange'
    });

    const ExpandedComponent = ({data}) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },

        {
            name: 'Surname',
            selector: row => row.surname,
            sortable: true,
        },

        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },

        {
            name: 'Course',
            selector: row => row.course,
            sortable: true,
        },

        {
            name: 'Course Format',
            selector: row => row.courseFormat,
            sortable: true,
        },

        {
            name: 'Course Type',
            selector: row => row.courseType,
            sortable: true,

        },

        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        }
    ];

    let {paidArr} = useSelector(state => state.paidReducer);
    let {firstPage} = useSelector(state => state.paidReducer);
    let {currentPage} = useSelector(state => state.paidReducer);

    let [paginateForFilteredData, setPaginateForFilteredData] = useState(false);
    let [filter, setFilter] = useState(null);

    let dispatch = useDispatch();

    const searchParams = new URLSearchParams();

    useEffect(() => {

        if (window.location == 'http://localhost:3000/tables') {
            dispatch(paidActions.getAllPaid(firstPage));
        } else {


            const urlSearchParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlSearchParams.entries());

            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    if (params[key] !== "") {
                        searchParams.append(`${key}`, `${params[key]}`);
                    }
                }
            }
            let query = searchParams.toString();

            setPaginateForFilteredData(true);
            setFilter(query);

            dispatch(paidActions.getAllPaid(firstPage + "&" + query));
        }

    }, [dispatch, firstPage, window.location])

    function getNextPage() {
        if (paginateForFilteredData !== true) {
            currentPage++
            dispatch(paidActions.getAllPaid(currentPage))
        } else {
            currentPage++
            dispatch(paidActions.getAllPaid(currentPage + "&" + filter))
        }
    }

    function getPreviousPage() {
        if (paginateForFilteredData !== true) {
            currentPage--
            dispatch(paidActions.getAllPaid(currentPage))
        } else {
            currentPage--
            dispatch(paidActions.getAllPaid(currentPage + "&" + filter))
        }
    }

    function submit(data) {

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] !== "") {
                    searchParams.append(`${key}`, `${data[key]}`);
                }
            }
        }

        setPaginateForFilteredData(true);

        let query = searchParams.toString()
        setFilter(query);

        window.history.pushState("", query, "/tables?" + query);
        console.log(window.location)
        dispatch(paidActions.getAllPaid(firstPage + "&" + query))

        if (window.location == 'http://localhost:3000/tables?') {
            window.history.pushState("", '', "/tables");
        }
    }

    function goToGetStarted() {
        window.location.href = '/GetStarted';
    }


    return (
        <div>
            <div className={css.header}>
                <div onClick={goToGetStarted} className={css.buttonGoBack}>
                    <h1> &lt; </h1>
                </div>
            </div>
            <div>
                <form className={css.form} onChange={handleSubmit(submit)}>
                    <input placeholder={'Name'} {...register('name')}/>
                    <input placeholder={'Surname'} {...register('surname')}/>
                    <input placeholder={'Phone'}  {...register('phone')}/>

                    <select id="Course" name="Course" {...register('course')}>
                        <option value=""></option>
                        <option value="FS">Full Stack</option>
                        <option value="JSCX">Java Script Complex</option>
                        <option value="JCX">Java Complex</option>
                        <option value="PCX">Python Complex</option>
                        <option value="QACX">QA Complex</option>
                    </select>

                    <select id="CourseFormat" name="CourseFormat" {...register('courseFormat')}>
                        <option value=""></option>
                        <option value="static">Static</option>
                        <option value="online">Online</option>
                    </select>

                    <select id="CourseType" name="CourseType" {...register('CourseType')}>
                        <option value=""></option>
                        <option value="minimal">Minimal</option>
                        <option value="pro">Pro</option>
                        <option value="premium">Premium</option>
                        <option value="incubator">Incubator</option>
                    </select>

                    <input placeholder={'Email'} {...register('email')}/>
                </form>
            </div>

            <div>
                <DataTable
                    columns={columns}
                    responsive={true}
                    data={paidArr.content}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />
            </div>

            <div className={css.paginator}>
                <div className={css.buttons}>
                    <button className={css.button} disabled={currentPage === 1} onClick={getPreviousPage}>Previous</button>
                    <button className={css.button} disabled={currentPage === paidArr.totalPages}
                            onClick={getNextPage}>Next
                    </button>
                </div>
                <div className={css.paragraphs}>
                    <p>current page: {currentPage}</p>
                    <p>total pages: {paidArr.totalPages}</p>
                </div>
            </div>


        </div>
    )
}

export {
    TableComponent
};