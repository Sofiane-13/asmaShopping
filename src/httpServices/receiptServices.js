import
http
from "./httpServices";
import {
    apiUrl
} from "../config.json";

export function getReceipts() {
    return http.get(apiUrl + "/receipts");
}

export function getReceiptsById(id) {
    return http.get(apiUrl + "/receipts/" + id);
}

export function putReceipts(data, ) {
    return http.put(apiUrl + "/receipts/" + data._id, data);
}

export function postReceipts(data) {
    return http.post(apiUrl + "/receipts/", data);
}