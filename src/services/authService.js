import http from "./httpServices";

export function getOtp(data) {
    return http.post("/SendOtp", data).then((res) => res.data);
}
