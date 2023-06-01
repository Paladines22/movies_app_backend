const sequelize = require("../utils/connection");
require("../models/Genre");
require("../models/Movie");
require("../models/Actor");
require("../models")

const main = async () => {
  try {
    await sequelize.sync({ force: true });

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
