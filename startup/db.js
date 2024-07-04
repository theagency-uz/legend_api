const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "legend_db",
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "Universe2000@",
  port: process.env.DB_PORT || 3306,
  dialect: "mysql",
  dateStrings: true,
  typeCast: true,
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "+05:00",
  },
  timezone: "+05:00", //=="Asia/Tashkent"
  logging: false,
});

module.exports = sequelize;
