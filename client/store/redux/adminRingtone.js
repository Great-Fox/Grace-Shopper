import axios from 'axios';

export const POST_SINGLE_RINGTONE = 'POST_SINGLE_RINGTONE'

export const postSingleRingtone = (ringtone) => ({
    type: POST_SINGLE_RINGTONE,
    ringtone
})

export const submitSingleRingtone = (ringtones) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem("token")
            const {data} = await axios.post('/api/admin/ringtones', {...ringtones, headers: {authorization: token}})
            dispatch(postSingleRingtone(data))
        } catch (error) {
            console.log(error)
        }
    }
}

// export default function adminRingtoneReducer(state = {}, action) {

// }