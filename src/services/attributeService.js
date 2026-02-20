import http from "./httpServices";


export function getAttributesApi() {
    return http.get("/attributes").then(res => res.data);
}

export function createAttributeApi(data) {
    return http.post("/attribute/store", data).then(res => res.data);
}

export function updateAttributeApi({ id, ...data }) {
    return http.put(`/attribute/${id}/update`, data).then(res => res.data);
}

export function deleteAttributeApi(id) {
    return http.delete(`/attribute/${id}/delete`).then(res => res.data);
}
