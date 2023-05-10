const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT } = conn.Sequelize;
const User = require("./User");

const Post = conn.define("post", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  url: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true,
    },
  },
  description: {
    type: TEXT,
    allowNull: true, // assuming comments are optional
  },
});

Post.belongsTo(User); // sets up the foreign key for UserId
User.hasMany(Post);

module.exports = Post;
