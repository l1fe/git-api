function Repo({ id, name, language, starsCount, bookmarked }) {
  this.id = id;
  this.name = name;
  this.language = language;
  this.starsCount = starsCount;
  this.bookmarked = bookmarked;
}

module.exports = Repo;
