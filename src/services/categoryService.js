import http from "./httpServices";

// GET - دریافت همه دسته‌بندی‌ها
export function getCategoriesApi() {
    return http.get("/categories").then((res) => res.data);
}

// POST - ایجاد دسته‌بندی جدید
export function createCategoryApi(data) {
    return http.post("/category/store", data).then((res) => res.data);
}

// PUT - ویرایش دسته‌بندی
export function updateCategoryApi({ id, name }) {
    return http.put(`/category/${id}/update`, { name }).then((res) => res.data);
}

export function deleteCategoryApi(id) {
    return http.delete(`/category/${id}/delete`).then((res) => res.data);
}