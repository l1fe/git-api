function Repo({ id, name, description, bookmarked, url }) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.bookmarked = bookmarked;
  this.url = url;
}

module.exports = Repo;
