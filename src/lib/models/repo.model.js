function Repo({ id, name, language, stars, bookmarked }) {
  this.id = id;
  this.name = name;
  this.language = language;
  this.stars = stars;
  this.bookmarked = bookmarked;
}

Repo.prototype.toggleBookmark = function toggleBookmark(value) {
  this.bookmarked = !!value;
};

module.exports = Repo;
