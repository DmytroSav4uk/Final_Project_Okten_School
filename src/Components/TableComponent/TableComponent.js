import DataTable from "react-data-table-component-with-filter";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";

import {paidActions} from "../../Redux/slices/paid.slice";
import css from "../../Css/table.module.css";
import loadingGif from "../../icons/loading.gif"


const TableComponent = () => {

    const {register,reset, handleSubmit} = useForm({
        mode: 'onChange'
    });

    const ExpandedComponent = ({data}) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const columns = [
        {
            selector: row => row.id,
        },

        {
            selector: row => row.name,
        },

        {
            selector: row => row.surname,
        },

        {
            selector: row => row.phone,
        },

        {
            selector: row => row.course,
        },

        {
            selector: row => row.courseFormat,
        },

        {
            selector: row => row.courseType,
        },

        {
            selector: row => row.email,
        },

        {
            selector: row => row.user?.profile.username,
        }
    ];

    let currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const urlSearchParams = new URLSearchParams();

    const search = useLocation().search;

    const {paidArr} = useSelector(state => state.paidReducer);
    const {firstPage} = useSelector(state => state.paidReducer);

    let {currentPage} = useSelector(state => state.paidReducer);

    let [paginateForFilteredData, setPaginateForFilteredData] = useState(false);
    let [filter, setFilter] = useState(null);
    let [filterWrittenInURL, setFilterWrittenInURL] = useState(true);





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

    const logOut = () => {
        localStorage.removeItem('currentUser');
        //window.location ,щоб сторінка перезавантажилася і очистився кеш
        window.location = '/getStarted';
    };

    const goToAdminPage = () => {
        navigate('/admin')
    }


    return (
        <div>
            <div className={css.header}>
                <div className={css.userName}>
                    <h1> Hello, {currentUser.profile.name}!</h1>
                </div>
                <div onClick={logOut} className={css.logout}>
                    <h1>logout</h1>
                </div>

                {currentUser.is_superuser ?
                    <div onClick={goToAdminPage} className={css.admin}><h1>Admin Page</h1></div> : null}
            </div>
            <div className={'filters'}>
                <form className={css.form} onBlur={handleSubmit(submit)}>
                    <div>
                        <input placeholder={'Id'}   {...register('id')}/>
                    </div>

                    <div>
                        <input placeholder={'Name'}   {...register('name')}/>

                    </div>

                    <div>
                        <input placeholder={'Surname'} {...register('surname')}/>
                    </div>

                    <div>
                        <input placeholder={'Phone'}  {...register('phone')}/>
                    </div>

                    <div>
                        <select id="Course" name="Course" {...register('course')}>
                            <option value=""></option>
                            <option value="FS">Full Stack</option>
                            <option value="FE">Front End</option>
                            <option value="JSCX">Java Script Complex</option>
                            <option value="JCX">Java Complex</option>
                            <option value="PCX">Python Complex</option>
                            <option value="QACX">QA Complex</option>
                        </select>
                    </div>
                    <div>
                        <select id="CourseFormat" name="CourseFormat" {...register('courseFormat')}>
                            <option value=""></option>
                            <option value="static">Static</option>
                            <option value="online">Online</option>
                        </select>
                    </div>
                    <div>
                        <select id="CourseType" name="CourseType" {...register('CourseType')}>
                            <option value=""></option>
                            <option value="minimal">Minimal</option>
                            <option value="pro">Pro</option>
                            <option value="premium">Premium</option>
                            <option value="incubator">Incubator</option>
                        </select>
                    </div>
                    <div>
                        <input className={css.smallAlign} placeholder={'Email'} {...register('email')}/>
                    </div>

                    <div className={css.reset} onClick={()=>{reset();

                    window.history.pushState("","","/tables?page=1")
                        dispatch(paidActions.getAllPaid('?page=1'))
                    }}>
reset filters
                    </div>
                </form>
            </div>

            <div className={css.ordering}>
                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('id') : descendingOrder('id')
                }}>Id
                </div>
                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('name') : descendingOrder('name')
                }}>Name
                </div>
                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('surname') : descendingOrder('surname')
                }}>Surname
                </div>
                <div>Phone</div>
                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('course') : descendingOrder('course')
                }}>Course
                </div>
                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('courseFormat') : descendingOrder('courseFormat')
                }}>Course Format
                </div>

                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('courseType') : descendingOrder('courseType')
                }}>Course Type
                </div>

                <div onClick={() => {
                    window.location.href.includes('order=-') ? accendingOrder('email') : descendingOrder('email')
                }}>Email
                </div>

                <div>
                    Mentor
                </div>
            </div>

            <div>
                <DataTable
                    columns={columns}
                    responsive={true}
                    data={paidArr.content}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    noTableHead={true}
                    noDataComponent={<div
                        style={{background: "#FBFBFB", width: "100%", display: "flex", justifyContent: "center"}}><img
                        src={loadingGif} alt={"loading"}/></div>}
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