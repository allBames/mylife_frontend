import axios from "axios";


if (sessionStorage.getItem('token') && sessionStorage.getItem('token') != null) {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token')
}


const instance = axios.create({
    withCredentials: true,
})


export const ObjectiveAPI = {

    getOneObjectiveEntry(objectiveID) {
        return instance.get(`/api/objective/` + objectiveID)
    },

    getObjective(userID = localStorage.getItem('id'), date_start = '2020-03-20', date_end = '3000-03-26') {
        return instance.get(`/api/objective?userID=${userID}&date_start=${date_start}&date_end=${date_end}`)
    },

    addObjective(objective, userID = localStorage.getItem('id')) {
        return instance.post(`/api/objective?userID=${userID}`, objective)
    },

    deleteObjective(objectiveID) {
        return instance.delete(`/api/objective/` + objectiveID)
    },

    editObjective(id, is_perform) {
        instance.put(`/api/objective/`, { "id": parseInt(id), "is_perform": is_perform })
    },

    editObjectiveAll(objectiveID, objective) {
        return instance.put(`/api/objective/` + objectiveID, objective)
    }
}

