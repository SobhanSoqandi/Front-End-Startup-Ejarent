import http from "./httpServices";


export function getAllAdvertisementApi() {
    return http.get("/Advertisements").then((res) => res.data);
}

export function addAdvertisementApi(data) {
    return http.post("/Advertisement/store" , data).then((res) => res.data);
}

export function getCategoriesApi() {
    return http.get("/categories").then((res) => res.data);
}