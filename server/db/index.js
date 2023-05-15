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
      title:
        "The open-source AI boom is built on Big Tech’s handouts. How long will it last?",
      url: "https://www.technologyreview.com/2023/05/12/1072950/open-source-ai-google-openai-eleuther-meta/",
      description:
        "Greater access to the code behind generative models is fueling innovation. But if top companies get spooked, they could close up shop.",
      userId: moe.id,
      image: "https://source.unsplash.com/mWztzk66I7Q",
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
