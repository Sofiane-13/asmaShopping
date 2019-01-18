export const ingredients = [{
    _id: "5b21ca3eeb7f6fbccd471818",
    name: "flour"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471820",
    name: "water"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    name: "milk"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "egs"
  },

];

export function getIngredients() {
  return ingredients.filter(g => g);
}

export function getIngredient(id) {
  const ingredient = ingredients.filter(g => g._id === id);
  return ingredient;
}