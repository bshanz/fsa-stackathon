const conn = require("./conn");
const User = require("./User");
const Post = require("./Post"); // import the Post model
const { getMetaData } = require("../Utils/helpers");

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

  // const metaDataArray = await Promise.all([
  //   getMetaData(
  //     "https://www.washingtonpost.com/opinions/2023/05/10/mothers-day-fathers-day-parenting-joy/"
  //   ),
  //   getMetaData(
  //     "https://www.nytimes.com/interactive/2023/05/10/opinion/nyc-office-vacancy-playground-city.html"
  //   ),
  // ]);

  // const formattedMetaData = metaDataArray.map((item) => item.data);

  // console.log(`wwwwwwwwwwwwwwwwwwww${formattedMetaData}`);

  // await Post.bulkCreate()

  const [moePost1, lucyPost1, larryPost1, ethylPost1] = await Promise.all([
    Post.create({
      title: "Moe's First Post",
      url: "https://www.washingtonpost.com/opinions/2023/05/10/mothers-day-fathers-day-parenting-joy/",
      description: "This is Moe's first post!",
      userId: moe.id,
    }),
    Post.create({
      title: "Lucy's First Post",
      url: "https://www.washingtonpost.com/opinions/2023/05/10/mothers-day-fathers-day-parenting-joy/",
      description: "This is Lucy's first post!",
      userId: lucy.id,
    }),
    Post.create({
      title: "Larry's First Post",
      url: "https://www.washingtonpost.com/opinions/2023/05/10/mothers-day-fathers-day-parenting-joy/",
      description: "This is Larry's first post!",
      userId: larry.id,
    }),
    Post.create({
      title: "Ethyl's First Post",
      url: "https://www.nytimes.com/interactive/2023/05/10/opinion/nyc-office-vacancy-playground-city.html",
      description: "This is Ethyl's first post!",
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
