import axios from 'axios';

export const POST_SINGLE_RINGTONE = 'POST_SINGLE_RINGTONE'
export const EDIT_SINGLE_RINGTONE = 'EDIT_SINGLE_RINGTONE'
export const DELETE_SINGLE_RINGTONE = 'DELETE_SINGLE_RINGTONE'

export const postSingleRingtone = (ringtone) => ({
    type: POST_SINGLE_RINGTONE,
    ringtone
})

export const editSingleRingtone = (ringtone) => ({
    type: EDIT_SINGLE_RINGTONE,
    ringtone
})

export const deleteSingleRingtone = (id) => ({
    type: DELETE_SINGLE_RINGTONE,
    id
})

const TOKEN = 'token';

export const submitSingleRingtone = (ringtones) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN);
            const {data} = await axios.post('/api/admin/ringtones', ringtones, {headers: {authorization: token}})
            dispatch(postSingleRingtone(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const editMySingleRingtone = (ringtone) => {
    return async (dispatch) => {
        try{
            const token = window.localStorage.getItem(TOKEN);
            const {data} = await axios.put(`/api/admin/${ringtone.id}`, ringtone, {headers: {authorization: token}}) 
            dispatch(editSingleRingtone(data))
        } catch(error) {
            console.log(error)
        }
    }
}

// export const deleteMySingleRingtone