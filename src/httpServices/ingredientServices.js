import
http
from "./httpServices";
import {
    apiUrl
} from "../config.json";

export function getIngredient() {
    return http.get(apiUrl + "/ingredients");
}

export function getIngredientById(id) {
    return http.get(apiUrl + "/ingredients/" + id);
}

export function putIngredient(data, ) {
    return http.put(apiUrl + "/ingredients/" + data._id, data);
}

export function postIngredient(data) {
    return http.post(apiUrl + "/ingredients/", data);
}