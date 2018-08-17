/* eslint-disable camelcase */
function Repo({ id, name, description, bookmarked, html_url }) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.bookmarked = bookmarked;
  this.html_url = html_url;
}
/* eslint-enable camelcase */

module.exports = Repo;
