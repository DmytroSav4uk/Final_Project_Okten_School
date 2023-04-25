import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {joiResolver} from "@hookform/resolvers/joi";

import {paidActions} from "../../Redux/slices/paid.slice";
import {commentValidator} from "../../validators/comment.validator";
import css from "../../css/comment.module.css";


const CommentForm = ({show}) => {

    const {register, handleSubmit,formState:{isValid,errors}} = useForm({
        mode:'onChange',
        resolver: joiResolver(commentValidator)
    });

    const dispatch = useDispatch();

    const commentSubmit = (data) => {
        dispatch(paidActions.patchPaidById(data))
        show(false)
    }

    return (
        <>
            <form className={css.form} onSubmit={handleSubmit(commentSubmit)}>
                <input  placeholder={'comment'} {...register('comment')}/>
                <button style={{borderRadius:'10px', transition:'ease-in-out 0.3s'}} disabled={!isValid} type={"submit"}>comment</button>
            </form>
            {errors.comment?<span className={css.commentSpan}>{errors.comment.message}</span> :null}
        </>
    )
}

export {CommentForm}