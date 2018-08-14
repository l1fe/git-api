import shortid from 'shortid';

function Bookmark({ repoId }) {
  this.id = shortid.generate();
  this.repoId = repoId;
}

export default Bookmark;
