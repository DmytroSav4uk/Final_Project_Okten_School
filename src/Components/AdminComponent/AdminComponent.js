import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import DataTable from "react-data-table-component-with-filter";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi"

import {adminActions} from "../../Redux/slices/admin.slice";
import css from "../../Css/admin.module.css"
import {formValidator} from "../../Validators/form.validator";

const AdminComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {usersArr} = useSelector(state => state.adminReducer);
    const {registerData} = useSelector(state => state.adminReducer);
    const {recreatedActivationLink} = useSelector(state => state.adminReducer);

    let [successMesage, setSuccessMessage] = useState(false);
    let [userForm, setUserForm] = useState(false);

    const {register, handleSubmit, formState: {isValid, errors}} = useForm({
        resolver: joiResolver(formValidator),
        mode: 'all'
    });

    let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;

    const ExpandedComponent = ({data}) =>
        <>
            {data.is_active ? null : <button onClick={() => {
                createActivationLink(data.id)
            }}>create activation link</button>}
        </>
    ;

    const columns = [
        {
            name: 'id',
            selector: row => row.id,
        },


        {
            name: 'name and nickname',
            selector: row => `${row.profile.name} (${row.profile.username})`,
        },


        {
            name: 'email',
            selector: row => row.email,
        },

        {
            name: 'role',
            selector: row => row.is_superuser ? 'super admin' : "admin"
        },

        {
            name: "is activated",
            selector: row => row.is_active ? 'yes' : "no"
        }


    ]

    useEffect(() => {
        if (user?.is_superuser) {
            dispatch(adminActions.getAllUsers())
        } else {
            navigate('/tables?page=1')
        }
    }, [])

    const goToTables = () => {
        navigate('/tables')
    }

    const showForm = () => {
        setUserForm(true)
    }
    const removeForm = () => {
        setUserForm(false)
    }
    const submit = (data) => {
        dispatch(adminActions.registerUser(data))
    };

    const createActivationLink = (id) => {
        dispatch(adminActions.recreateActivationLink(id))
        //не працює запит
        console.log(recreatedActivationLink)
    }

    return (
        <>
            <div className={css.header}>
                <div onClick={goToTables} className={css.button}>
                    <h1>
                        back to tables
                    </h1>
                </div>

                <div onClick={showForm} className={css.button}>
                    <h1>
                        add User
                    </h1>
                </div>
            </div>

            <div>
                <DataTable
                    columns={columns}
                    data={usersArr}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />
            </div>

            {userForm ?
                <div className={css.black}>
                    <div className={css.wrap}>

                        <div className={css.main}>
                            <h1 onClick={removeForm}
                                style={{
                                    position: "fixed",
                                    top: "80px",
                                    right: "37%",
                                    cursor: "pointer",
                                    width: "fit-content"
                                }}>x</h1>

                            <form className={css.registerForm} onSubmit={handleSubmit(submit)}>
                                <input placeholder={'email'} {...register('email')}/>
                                {errors.email && <span>{errors.email.message}</span>}
                                <input placeholder={'name'} {...register('name')}/>
                                {errors.name && <span>{errors.name.message}</span>}
                                <input placeholder={'username'} {...register('username')}/>
                                {errors.username && <span>{errors.username.message}</span>}
                                <button disabled={!isValid} type={"submit"}>submit</button>
                            </form>

                            {registerData?.token ?
                                <p className={css.copyUrl} onClick={() => {
                                    navigator.clipboard.writeText(`http://localhost:3000/admin/activate/${registerData?.token}`);
                                    setSuccessMessage(true)
                                }}>click to copy url</p>
                                : null}

                            {successMesage ?
                                <p className={css.successMesage} style={{textAlign: "center"}}>url copied <br/>now send
                                    it to user so he could activate account</p>
                                : null}
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}

export {AdminComponent};