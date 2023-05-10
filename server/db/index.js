const conn = require("./conn");
const User = require("./User");
const Post = require("./Post"); // import the Post model

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: "moe",
      password: "123",
      firstName: "Moe",
      lastName: "Howard",
      email: "moe@howard.com",
    }),
    User.create({
      username: "lucy",
      password: "123",
      firstName: "Lucy",
      lastName: "Ricardo",
      email: "lucy@ricardo.com",
    }),
    User.create({
      username: "larry",
      password: "123",
      firstName: "Larry",
      lastName: "Fine",
      email: "larry@fine.com",
    }),
    User.create({
      username: "ethyl",
      password: "123",
      firstName: "Ethyl",
      lastName: "Mertz",
      email: "ethyl@mertz.com",
    }),
  ]);

  const [moePost1, lucyPost1, larryPost1, ethylPost1] = await Promise.all([
    Post.create({
      url: "https://www.washingtonpost.com/opinions/2023/05/10/mothers-day-fathers-day-parenting-joy/",
      comment: "This is Moe's first post!",
      userId: moe.id,
    }),
    Post.create({
      url: "https://www.washingtonpost.com/opinions/2023/05/10/mothers-day-fathers-day-parenting-joy/",
      comment: "This is Lucy's first post!",
      userId: lucy.id,
    }),
    Post.create({
      url: "https://www.washingtonpost.com/opinions/2023/05/10/mothers-day-fathers-day-parenting-joy/",
      comment: "This is Larry's first post!",
      userId: larry.id,
    }),
    Post.create({
      url: "https://www.nytimes.com/interactive/2023/05/10/opinion/nyc-office-vacancy-playground-city.html",
      comment: "This is Ethyl's first post!",
      userId: ethyl.id,
    }),
  ]);

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
    posts: {
      moePost1,
      lucyPost1,
      larryPost1,
      ethylPost1,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Post,
};
