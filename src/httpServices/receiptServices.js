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