import * as axios from "axios";

const instance = axios.create({
    withCredentials: true
})


export const DiaryAPI = {

    getOneDiaryEntry(diaryID) {
        return instance.get(`/api/diary/` + diaryID)
    },

    getDiary() {
        return instance.get(`/api/diary/`)
    },

    addDiary(diary) {
        return instance.post(`/api/diary/add/`, diary)
    },

    deleteDiary(diaryID) {
        return instance.delete(`/api/diary/` + diaryID)
    },

    editDiary(diaryID, diary) {
        debugger
        return instance.put(`/api/diary/` + diaryID, diary)
    }




    // getStatus(userId) {
    //     return instance.get('profile/status/' + userId)
    // },
    //
    // logout() {
    //     return instance.delete(`auth/login`)
    // },
    //
    // savePhoto(photoFile) {
    //     const formData = new FormData()
    //     formData.append("image", photoFile)
    //     return instance.put(`profile/photo`, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    // }
}

