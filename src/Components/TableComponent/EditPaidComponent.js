import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import {paidActions} from "../../Redux/slices/paid.slice";
import css from "../../css/admin.module.css"
import {joiResolver} from "@hookform/resolvers/joi";
import {editValidator} from "../../validators/edit.validator";
import {useState} from "react";

const EditPaidComponent = ({preloadedValues}) => {

    const {register, handleSubmit, formState: {isValid, errors}} = useForm({
        mode: 'onChange',
        resolver: joiResolver(editValidator)
    });

    const urlSearchParams = new URLSearchParams();
    const dispatch = useDispatch();
    const currentUrl = window.location.search;

    let [phone, setPhone] = useState('')
    let changedPhone;

    const submit = (data) => {
        console.log(data)
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data !== "createdAt" && data !== "user" && data !== "comments" && data !== 'phone') {
                    if (data[key] !== data.createdAt && data[key] !== data.user && data[key] !== data.comments && data[key] !== data.phone) {
                        urlSearchParams.append(`${key}`, `${data[key]}`);
                    }
                }
            }
        }
        let query = urlSearchParams.toString()


        if (changedPhone && changedPhone.length >= 10 && changedPhone.length <= 15 ){
            dispatch(paidActions.patchPaidById("id=" + preloadedValues?.id + "&" + query + "&phone=" + changedPhone))
        }else {
            dispatch(paidActions.patchPaidById("id=" + preloadedValues?.id + "&" + query + "&phone=" + phone))
        }

        if (query) {
            setTimeout(() => {
                dispatch(paidActions.getAllPaid(currentUrl))
            }, 300)
        }
    }

    const closeEdit = () => {
        dispatch(paidActions.closeEditing())
    }

    return (
        <div className={css.black}>
            <div className={css.registerForm}>
                <form className={css.userForm} onSubmit={handleSubmit(submit)}>
                    <input value={preloadedValues.id} style={{textAlign: "center"}} disabled={true}
                           name={'id'} {...register('id')}/>
                    <div>
                        <select
                            defaultValue={preloadedValues?.status === "" || preloadedValues?.status === null ? "В роботі" : preloadedValues?.status}
                            style={{width: '219.33px', height: "29.5px", margin: "5px"}}  {...register('status')}>
                            <option value="В роботі">В роботі</option>
                            <option value="Новий">Новий</option>
                            <option value="Згоден">Згоден</option>
                            <option value="Не+Згоден">Не Згоден</option>
                            <option value="Дубляж">Дубляж</option>
                        </select>
                    </div>

                    <div style={{display: "flex"}}>
                        <input defaultValue={preloadedValues.name} placeholder={'Name'}
                               name={'name'} {...register('name')}/>
                        <input defaultValue={preloadedValues.surname} placeholder={'Surname'}
                               name={'surname'}  {...register('surname')}/>
                    </div>

                    <div style={{display: "flex"}}>
                        <PhoneInput containerStyle={{width: '219px', margin: '5px'}} inputStyle={{width: '219px'}}
                                    country={'ua'} value={preloadedValues.phone}

                                    onChange={(data) => changedPhone = data}
                                    onMount={(data) => setPhone(data)}
                        />
                        <input defaultValue={preloadedValues.email} placeholder={'Email'}
                               name={"email"}  {...register('email')}/>
                    </div>

                    <div>
                        <select defaultValue={preloadedValues.course}
                                style={{width: '219.33px', height: "29.5px", margin: "5px"}} id="Course"
                                name={"course"}   {...register('course')}>
                            <option value=""></option>
                            <option value="FS">Full Stack</option>
                            <option value="FE">Front End</option>
                            <option value="JSCX">Java Script Complex</option>
                            <option value="JCX">Java Complex</option>
                            <option value="PCX">Python Complex</option>
                            <option value="QACX">QA Complex</option>
                        </select>
                        <select defaultValue={preloadedValues.courseFormat}
                                style={{width: '219.33px', height: "29.5px", margin: "5px"}} id="CourseFormat"
                                name={"courseFormat"}  {...register('courseFormat')}>
                            <option value=""></option>
                            <option value="static">Static</option>
                            <option value="online">Online</option>
                        </select>
                    </div>

                    <div style={{display: 'flex', width: '458.667px'}}>
                        <select style={{minWidth: '219.23px', height: "29.5px", margin: "5px"}}
                                defaultValue={preloadedValues.courseType} id="CourseType"
                                name={"courseType"} {...register('courseType')}>
                            <option value=""></option>
                            <option value="minimal">Minimal</option>
                            <option value="pro">Pro</option>
                            <option value="premium">Premium</option>
                            <option value="incubator">Incubator</option>
                        </select>
                        <input defaultValue={preloadedValues.age} placeholder={'age'}
                               name={'age'} {...register('age')}/>
                    </div>

                    <div style={{display: 'flex'}}>
                        <input defaultValue={preloadedValues.sum} placeholder={'sum'}
                               name={'sum'} {...register('sum')}/>
                        <input defaultValue={preloadedValues.alreadyPaid} placeholder={'alreadyPaid'}
                               name={'alreadyPaid'} {...register('alreadyPaid')}/>
                    </div>

                    {errors.name || errors.surname || errors.email || errors.phone || errors.sum || errors.alreadyPaid || errors.course || errors.courseType || errors.courseFormat || errors.age ?
                        <span className={css.span}>Form is invalid</span> : null}

                    <div style={{display: 'flex'}}>
                        <button style={{width: "100px", margin: "10px"}} onClick={closeEdit}>close</button>
                        <button className={css.submitBtn} disabled={!isValid} style={{width: "100px", margin: "10px",}}
                                type={"submit"}>submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export {EditPaidComponent}