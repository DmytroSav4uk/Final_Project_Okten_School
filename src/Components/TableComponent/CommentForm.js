import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {paidActions} from "../../Redux/slices/paid.slice";


const CommentForm = ({id}) => {

    const {register, handleSubmit} = useForm({
        values: id,
    });

    const dispatch = useDispatch();

    const commentSubmit = (data) => {
        dispatch(paidActions.patchPaidById("id="+ data.id + "&comment=" + data.comment))
    }


    return (
        <>
            <form onSubmit={handleSubmit(commentSubmit)}>
                <input style={{display: "none"}} placeholder={'id'} name={'id'} {...register('id')}/>
                <input placeholder={'comment'} {...register('comment')}/>
                <button type={"submit"}>comment</button>
            </form>
        </>
    )
}

export {CommentForm}