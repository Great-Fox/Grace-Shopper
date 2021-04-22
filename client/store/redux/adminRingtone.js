import axios from 'axios';

const POST_SINGLE_RINGTONE = 'POST_SINGLE_RINGTONE'

export const postSingleRingtone = (ringtone) => ({
    type: POST_SINGLE_RINGTONE,
    ringtone
})

export const submitSingleRingtone = (ringtone) => {
    return async (dispatch) => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
}

export default function adminRingtoneReducer(state = {}, action) {

}