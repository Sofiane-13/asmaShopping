export const genres = [{
    _id: "5b21ca3eeb7f6fbccd471818",
    name: "receipt"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471820",
    name: "cooked meal"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    name: "bakery"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "fruit"
  },


];

export function getGenres() {
  return genres.filter(g => g);
}
export function getGenre(id) {
  const Genre = genres.filter(g => g._id === id);
  return Genre;
}