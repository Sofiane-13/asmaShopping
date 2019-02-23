export const genres = [{
    _id: "5b21ca3eeb7f6fbccd471801",
    name: "receipt"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471802",
    name: "cooked meal"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471803",
    name: "bakery"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471804",
    name: "fruit"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471805",
    name: "traditional"
  },


];

export function getGenres() {
  return genres.filter(g => g);
}
export function getGenre(id) {
  const Genre = genres.filter(g => g._id === id);
  return Genre;
}

export function getGenreByName(name) {
  const Genre = genres.filter(g => g.name == name);
  return Genre;
}