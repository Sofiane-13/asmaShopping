export const listShopping = [{
    name: "flour",
    quantity: 2
}, ];

export function getListShopping() {
    return listShopping.filter(g => g);
}

export function getIngredient(name) {
    return listShopping.find(m => m.name === name);
}

export function addingToShoppingListe(receipt) {
    const ingredientToAdd = receipt.ingredients;
    let i;
    for (i = 0; i < ingredientToAdd.length; i++) {
        var ingredientExesting = getIngredient(ingredientToAdd[i].name);
        if (typeof ingredientExesting !== 'undefined') {

            ingredientExesting.quantity = ingredientExesting.quantity + ingredientToAdd[i].quantity;
            //Remove ingredient
            deleteIngredient(ingredientToAdd[i].name);
            // adding new ingredient
            listShopping.push(ingredientExesting);

        } else {
            const newIngredient = {
                name: ingredientToAdd[i].name,
                quantity: ingredientToAdd[i].quantity
            }
            listShopping.push(newIngredient);
        }
    }


}
export function removingFromShoppingList(receipt) {

    const ingredientToRemove = receipt.ingredients;
    let i;
    for (i = 0; i < ingredientToRemove.length; i++) {
        var ingredientExesting = getIngredient(ingredientToRemove[i].name);

        if (typeof ingredientExesting !== 'undefined') {
            ingredientExesting.quantity = ingredientExesting.quantity - ingredientToRemove[i].quantity;
            deleteIngredient(ingredientToRemove[i].name);

            if (ingredientExesting.quantity > 0) {
                const newIngredient = {
                    name: ingredientToRemove[i].name,
                    quantity: ingredientExesting.quantity
                }
                listShopping.push(newIngredient);
            }
        }
    }
}

export function deleteIngredient(name) {
    let ingredientInDb = listShopping.find(m => m.name === name);
    listShopping.splice(listShopping.indexOf(ingredientInDb), 1);
    return ingredientInDb;
}