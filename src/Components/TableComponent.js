import DataTable from "react-data-table-component-with-filter";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";

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

    const {paidArr} = useSelector(state => state.paidReducer);
    const {firstPage} = useSelector(state => state.paidReducer);

    let {currentPage} = useSelector(state => state.paidReducer);

    let [paginateForFilteredData, setPaginateForFilteredData] = useState(false);
    let [filter, setFilter] = useState(null);
    let [filterWrittenInURL, setFilterWrittenInURL] = useState(true);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const urlSearchParams = new URLSearchParams();
    // const [querySearchParams,setQuerySearchParams] = useSearchParams();

    const search = useLocation().search;

    useEffect(() => {
        dispatch(paidActions.getAllPaid(search))


        if (filterWrittenInURL && search.length > 8) {
            setPaginateForFilteredData(true);

            let mySubString = search.substring(
                search.indexOf("&"),
                search.lastIndexOf("")
            );

            setFilter(mySubString)
            setFilterWrittenInURL(false)
        }

    }, [dispatch, firstPage, search, filterWrittenInURL]);


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

    const getNextPage = () => {

        let url = window.location.href;

        if (url.includes('order=')) {
            let length = 'order='.length
            let order = url.slice(url.indexOf('order=') + length)
            currentPage++
            navigate("/tables?page=" + currentPage + "&order=" + order)
        } else {
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
    };

    const getPreviousPage = () => {
        let url = window.location.href;

        if (url.includes('order=')) {
            let length = 'order='.length
            let order = url.slice(url.indexOf('order=') + length)
            currentPage--
            navigate("/tables?page=" + currentPage + "&" + order)
        }

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
    };

    const goToGetStarted = () => {
        navigate('/GetStarted');
    };

    const submit = (data) => {

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] !== "") {
                    urlSearchParams.append(`${key}`, `${data[key]}`);
                }
            }
        }

        setPaginateForFilteredData(true);

        let query = urlSearchParams.toString()
        setFilter(query);

        let url = window.location.href;

        if (url.includes('order=')) {

            let length = 'order='.length
            let order = url.slice(url.indexOf('order=') + length)

            window.history.pushState("", query, '/tables?page=1&' + query + "&order=" + order);
            dispatch(paidActions.getAllPaid('?page=1&' + query + "&order=" + order))
        } else {
            window.history.pushState("", query, '/tables?page=1&' + query);
            dispatch(paidActions.getAllPaid('?page=1&' + query))
        }


    };

    const accendingOrder = (orderBy) => {
        window.history.pushState("", "", 'tables?page=1&order=' + orderBy)
        let url = window.location.href;
        let mySubString = url.substring(
            url.indexOf("?"),
            url.lastIndexOf("")
        );
        dispatch(paidActions.getAllPaid(mySubString))
    }


    const descendingOrder = (orderBy) => {
        window.history.pushState("", "", 'tables?page=1&order=-' + orderBy)
        let url = window.location.href;

        let mySubString = url.substring(
            url.indexOf("?"),
            url.lastIndexOf("")
        );
        dispatch(paidActions.getAllPaid(mySubString))
    }


    return (
        <div>
            <div className={css.header}>
                <div onClick={goToGetStarted} className={css.buttonGoBack}>
                    <h1> &lt; </h1>
                </div>
            </div>
            <div className={'filters'}>
                <form className={css.form} onBlur={handleSubmit(submit)}>
                    <input placeholder={'Name'}   {...register('name')}/>
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

            <div className={'ordering'}>
                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('name') : descendingOrder('name')
                }}>Name
                </div>
                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('surname') : descendingOrder('surname')
                }}>Surname
                </div>
                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('course') : descendingOrder('course')
                }}>Course
                </div>
                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('courseFormat') : descendingOrder('courseFormat')
                }}>Course Format
                </div>
                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('email') : descendingOrder('email')
                }}>Email
                </div>
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