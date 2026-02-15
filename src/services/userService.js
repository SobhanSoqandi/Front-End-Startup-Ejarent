import http from "./httpServices";

// GET - دریافت همه کاربران
export function getUsersApi() {
    return http.get("/get-users").then((res) => res.data);
}

// DELETE - حذف کاربر
export function deleteUserApi(id) {
    return http.delete(`/user/${id}/destroy`).then((res) => res.data);
}