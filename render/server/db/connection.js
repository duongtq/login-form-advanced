const USERNAME = 'admin';
const PASSWORD = 'admin';
const DATABASE = 'LoginApp';
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@mflix.c2hgx.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

module.exports = URI;
