import http from "./httpServices";

export function getOtp(data) {
    return http.post("/SendOtp", data).then((res) => res.data);
}


export function checkOtp(data) {
    return http.post("/checkotp", data).then((res) => res.data);
}
