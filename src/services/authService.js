import http from "./httpServices";

export function getOtp(data) {
    return http.post("/SendOtp", data).then((res) => res.data);
}


// export function checkOtp(data) {
//     return http.post("/checkotp", data).then((res) => res.data);
// }



export function checkOtp(data) {
    return http.post("/checkotp", data).then((res) => {
        const token = res.data.token;

        if (token) {
            localStorage.setItem("token", token);
        }

        return res.data;
    });
}



export function CompleteProfile(data) {
    return http.post("/complete-profile", data).then((res) => res.data);
}

export function getUser() {
    return http.get("/user/profile").then((res) => res.data);
}
