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

  const [moePost1, lucyPost1, larryPost1, ethylPost1] = await Promise.all([
    Post.create({
      title:
        "The open-source AI boom is built on Big Tech’s handouts. How long will it last?",
      url: "https://www.technologyreview.com/2023/05/12/1072950/open-source-ai-google-openai-eleuther-meta/",
      description:
        "Greater access to the code behind generative models is fueling innovation. But if top companies get spooked, they could close up shop.",
      userId: moe.id,
      image: "https://source.unsplash.com/mWztzk66I7Q",
      comment:
        "Fascinating article on how open source AI models rely on big tech.",
    }),
    Post.create({
      title: "Will Chatbots Replace Money Managers?",
      url: "https://www.bloomberg.com/opinion/articles/2023-05-16/crash-course-how-soon-will-ai-replace-money-managers?srnd=premium&leadSource=uverify%20wall",
      description:
        "The science and art of successful investing for institutions and individuals could be in AI’s crosshairs.",
      userId: lucy.id,
      image:
        "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NDA5MDg2Mg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
      comment: "AI putting more jobs at risk!",
    }),
    Post.create({
      title: "Get Ready for Tim Cook's Riskiest Move at Apple",
      url: "https://www.bloomberg.com/opinion/articles/2023-05-16/apple-s-tim-cook-takes-a-risk-on-mixed-reality-headsets-and-the-metaverse?srnd=premium&leadSource=uverify%20wall",
      description:
        "Just as everyone seems to be tiring of the metaverse, Steve Jobs’ successor comes up with the company’s first mixed reality headset.",
      userId: larry.id,
      image:
        "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NDI0NjQxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
      comment: "Apple is about to change the game in VR.",
    }),
    Post.create({
      title:
        "26 Empire State Buildings Could Fit Into New York’s Empty Office Space. That’s a Sign.",
      url: "https://www.nytimes.com/interactive/2023/05/10/opinion/nyc-office-vacancy-playground-city.html",
      description:
        "New York is undergoing a metamorphosis from a city dedicated to productivity to one built around pleasure. Many office buildings still feel eerily empty, with occupancy around 50 percent of prepandemic levels, harming landlords and the local economy.",
      userId: ethyl.id,
      image:
        "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NDI0NjUzOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
      comment: "Remote work is here to stay.",
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
