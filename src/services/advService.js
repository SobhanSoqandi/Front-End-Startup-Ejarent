import http from "./httpServices";



export function getAllAdvertisementApi(filters = {}) {
    return http.get("/Advertisements/search", {
        params: filters,
    }).then(res => res.data);
}

export function addAdvertisementApi(data) {
    return http.post("/Advertisement/store", data).then((res) => res.data);
}

export function getCategoriesApi() {
    return http.get("/categories").then((res) => res.data);
}

export function getMyAdvertisementApi() {
    return http.get("/advertisement/my").then((res) => res.data);
}


export function editAdvertisementApi({ id, data }) {
    return http.put(`/advertisement/${id}/update`, data);
}


export function deleteAdvertisementApi(id) {
    return http.delete(`/advertisement/${id}/delete`);
}