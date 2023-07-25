module.exports = {
    DB: process.env.MYSQL_DATABASE || "db",
    USER: process.env.MYSQL_USER || "root",
    PASSWORD: process.env.MYSQL_PASSWORD || "root",
    HOST: process.env.MYSQL_HOST || "localhost",
    PORT: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  }
