import DataTable from "react-data-table-component-with-filter";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {paidActions} from "../redux/slices/paid.slice";
import css from "../css/table.module.css";
import {useLocation, useNavigate} from "react-router-dom";

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

    const {paidArr} = useSelector(state => state.paidReducer);
    const {firstPage} = useSelector(state => state.paidReducer);

    let {currentPage} = useSelector(state => state.paidReducer);

    let [paginateForFilteredData, setPaginateForFilteredData] = useState(false);
    let [filter, setFilter] = useState(null);
    let [filterWrittenInURL, setFilterWrittenInURL] = useState(true)


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchParams = new URLSearchParams();

    const search = useLocation().search;

    useEffect(() => {
        dispatch(paidActions.getAllPaid(search))

        //
        if (filterWrittenInURL && search.length > 8) {
            setPaginateForFilteredData(true);

            let mySubString = search.substring(
                search.indexOf("&"),
                search.lastIndexOf("")
            );

            setFilter(mySubString)
            setFilterWrittenInURL(false)
        }

    }, [dispatch, firstPage, search, filterWrittenInURL])


    const getFirstPage = () => {
        if (filter) {
            navigate("/tables?page=" + firstPage + "&" + filter)
        }
        if (filter && filterWrittenInURL === false) {
            navigate("/tables?page=" + firstPage + filter)
        } else {
            navigate("/tables?page=" + firstPage)
        }
    };

    function getNextPage() {
        if (paginateForFilteredData !== true) {
            currentPage++
            navigate("/tables?page=" + currentPage)
        } else if (filterWrittenInURL === false) {
            currentPage++
            navigate("/tables?page=" + currentPage + filter)
        } else {
            currentPage++
            navigate("/tables?page=" + currentPage + "&" + filter)
        }
    }

    function getPreviousPage() {
        if (paginateForFilteredData !== true) {
            currentPage--
            navigate("/tables?page=" + currentPage)
        } else if (filterWrittenInURL === false) {
            currentPage--
            navigate("/tables?page=" + currentPage + filter)
        } else {
            currentPage--
            navigate("/tables?page=" + currentPage + "&" + filter)
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

        window.history.pushState("", query, '/tables?page=1&' + query);
        dispatch(paidActions.getAllPaid('?page=1&' + query))
    }

    function goToGetStarted() {
        navigate('/GetStarted');
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
                    <button className={css.button} disabled={currentPage === 1} onClick={getPreviousPage}>Previous
                    </button>
                    <button className={css.button}
                            onClick={currentPage === paidArr.totalPages ? getFirstPage : getNextPage}>Next
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