import http from "./httpServices";
import {
    apiUrl
} from "../config.json";

export function getShoppingList() {
    return http.get(apiUrl + "/shoppingList");
}

export function getShoppingListById(id) {
    return http.get(apiUrl + "/shoppingList/" + id);
}

export function putShoppingList(data) {
    return http.put(apiUrl + "/shoppingList/" + data._id, data);
}

export async function postShoppingList(data, liked) {
    let allIngredients = await getShoppingList();

    const iterator = data.ingredients.values();
    let i = 0;
    for (const value of iterator) {
        const exestingIngredient = allIngredients.data.filter(
            i => i.idIngredient == value.idIngredient
        );

        if (exestingIngredient && exestingIngredient.length > 0) {
            const newIngredient = exestingIngredient[0];

            if (liked) {
                const calc = exestingIngredient[0].quantity - value.quantity;
                if (calc > 0) {
                    newIngredient.quantity = calc;
                    let result = await putShoppingList(newIngredient);
                } else {
                    let resultDelete = await deleteShoppingList(newIngredient);
                }
            } else {

                newIngredient.quantity = value.quantity + exestingIngredient[0].quantity;
                let result = await putShoppingList(newIngredient);
            }
            exestingIngredient = null;
        } else {
            if (liked) {

            } else {
                delete(value._id);
                http.post(apiUrl + "/shoppingList/", value);
            }
        }

    }

}

export async function deleteShoppingList(data) {
    return http.delete(apiUrl + "/shoppingList/" + data._id);
}