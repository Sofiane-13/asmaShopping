export const ingredients = [{
    _id: "5b21ca3eeb7f6fbccd471818",
    name: "flour",
    unity: "Kg"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471820",
    name: "water",
    unity: "L"

  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    name: "milk",
    unity: "L"

  },
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "egs",
    unity: "P"

  },

];

export function getIngredients() {
  return ingredients.filter(g => g);
}

export function getIngredient(id) {
  const ingredient = ingredients.filter(g => g._id === id);
  return ingredient;
}