const fs = require("fs");

const path = "./server/data/users.json";
const User = (function () {
  let data = fs.readFileSync(path, "utf8");
  let users = JSON.parse(data, (key, value) => value);
  return {
    writeF() {
      fs.writeFileSync(path, JSON.stringify(users));
    },
    readF() {
      data = fs.readFileSync(path, "utf8");
      users = JSON.parse(data, (key, value) => value);
    },
    getUser(id) {
      User.readF();
      if (id !== null || id !== undefined) {
        const index = users.findIndex(element => element.id === id);
        return users[index];
      } return undefined;
    },
    getId() {
      User.readF();
      return users[0].id;
    },
    getUserByLogin(login) {
      User.readF();
      if (login !== undefined) {
        const index = users.findIndex(element => element.username === login);
        return users[index];
      } return undefined;
    },
    validateUser(user) {
      User.readF();
      if (user !== null) {
        if (user.id !== "") {
          const index = users.findIndex(element => element.id === user.id);
          if (index === -1) {
            const index2 = users.findIndex(element => element.username === user.username);
            if (index2 === -1) {
              if (user.username !== null && user.username !== "") { return true; }
              return false;
            } return false;
          } return false;
        } return false;
      } return false;
    },
    addUser(user) {
      User.readF();
      if (User.validateUser(user)) {
        users.unshift(user);
        User.writeF();
        return true;
      }
      return false;
    },
  };
}());
module.exports = User;
