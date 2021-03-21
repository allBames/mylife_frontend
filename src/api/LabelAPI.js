import * as axios from "axios";

const instance = axios.create({
    withCredentials: true
})

export const LabelAPI = {

    getOneLabelEntry(labelID) {
        return instance.get(`/api/label/` + labelID)
    },

    getLabel(userID = localStorage.getItem('id')) {
        return instance.get(`/api/label?userID=${userID}`)
    },

    addLabel(label, userID = localStorage.getItem('id')) {
        return instance.post(`/api/label?userID=${userID}`, label)
    },

    deleteLabel(labelID) {
        return instance.delete(`/api/label/` + labelID)
    },

    editLabel(labelID, label) {
        debugger
        return instance.put(`/api/label/` + labelID, label)
    }
}

