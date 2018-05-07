const fs = require("fs");

const path = "./server/data/posts.json";
const Racoon = (function () {
  let data = fs.readFileSync(path, "utf8");
  let photoPosts = JSON.parse(data, (key, value) => {
    if (key === "createdAt") return new Date(value);
    return value;
  });
  return {
    writeF() {
      fs.writeFileSync(path, JSON.stringify(photoPosts));
    },
    readF() {
      data = fs.readFileSync(path, "utf8");
      photoPosts = JSON.parse(data, (key, value) => {
        if (key === "createdAt") return new Date(value);
        return value;
      });
    },
    getArr() {
      Racoon.readF();
      return photoPosts;
    },
    getPhotoPost(id) {
      Racoon.readF();
      if (id !== null || id !== undefined) {
        const index = photoPosts.findIndex(element => element.id === id);
        return photoPosts[index];
      } return undefined;
    },
    getPhotoPostIndex(id) {
      Racoon.readF();
      if (id !== null || id !== undefined) {
        const index = photoPosts.findIndex(element => element.id === id);
        return index;
      } return undefined;
    },
    getPhotoPostByIndex(index) {
      Racoon.readF();
      if (index !== undefined && index >= 0 && index < photoPosts.length) {
        return photoPosts[index];
      } return undefined;
    },
    validatePhotoPost(photoPost) {
      Racoon.readF();
      const da = new Date(photoPost.createdAt);
      photoPost.createdAt = da;
      if (photoPost !== null) {
        if ((photoPost.id !== "") && (typeof photoPost.id === "string")) {
          const index = photoPosts.findIndex(element => element.id === photoPost.id);
          if (index === -1) {
            if ((photoPost.description !== "") && (typeof photoPost.description === "string" && String(photoPost.description).length < 200) && (photoPost.createdAt instanceof Date) && (photoPost.author !== "") &&
                            (typeof photoPost.author === "string") && (photoPost.photoLink !== "") && (typeof photoPost.photoLink === "string")) {
              if (photoPost.likes !== undefined) {
                if (!(photoPost.likes instanceof Array)) { return false; }
              }
              if (photoPost.hashtags !== undefined) {
                if (photoPost.hashtags instanceof Array) { return true; }
                return false;
              }
              return true;
            } return false;
          } return false;
        } return false;
      } return false;
    },

    addPhotoPost(photoPost) {
      Racoon.readF();
      if (Racoon.validatePhotoPost(photoPost)) {
        photoPosts.unshift(photoPost);
        photoPosts.sort((a, b) => b.createdAt - a.createdAt);
        return true;
      } return false;
    },

    removePhotoPost(id) {
      Racoon.readF();
      const index = photoPosts.findIndex(element => element.id === id);
      if (index === -1) { return false; }

      photoPosts.splice(index, 1);
      return true;
    },

    editPhotoPost(id, photoPost2) {
      const photoPost = JSON.parse(photoPost2);
      Racoon.readF();
      if (id !== undefined && photoPost !== undefined) {
        const index = photoPosts.findIndex(element => element.id === id);
        if (index !== -1) {
          if (photoPost.description !== undefined) {
            if ((photoPost.description !== "") && (typeof photoPost.description === "string" && String(photoPost.description).length < 200)) { photoPosts[index].description = photoPost.description; } else return false;
          }
          if (photoPost.photoLink !== undefined) {
            if ((photoPost.photoLink !== "") && (typeof photoPost.photoLink === "string")) { photoPosts[index].photoLink = photoPost.photoLink; } else return false;
          }
          if (photoPost.hashtags !== undefined && (photoPost.hashtags instanceof Array)) {
            photoPosts[index].hashtags = photoPost.hashtags;
          }
          if (photoPost.likes !== undefined && (photoPost.likes instanceof Array)) {
            if ((photoPost.likes.findIndex(elem => elem === photoPosts[index].author) === -1)) {
              photoPosts[index].likes = photoPost.likes;
              return true;
            } return false;
          }
          return true;
        } return false;
      } return false;
    },
    getArSize() {
      Racoon.readF();
      return photoPosts.length;
    },
    addLike(id, user) {
      Racoon.readF();
      const index = photoPosts.findIndex(element => element.id === id);
      if (index !== -1) {
        if (photoPosts[index].likes !== undefined) {
          const numb = photoPosts[index].likes.findIndex(element => element === user);
          if (numb === -1) {
            photoPosts[index].likes.unshift(user);
          } else photoPosts[index].likes.splice(numb, 1);
        } else photoPosts[index].likes = [user];
        return photoPosts[index].likes.length;
      }
      return 0;
    },
    numbLikes(id) {
      Racoon.readF();
      const index = photoPosts.findIndex(element => element.id === id);
      if (photoPosts[index].likes === undefined) return 0;
      return photoPosts[index].likes.length;
    },

    getPhotoPosts(skip2, top2, filter) {
      Racoon.readF();
      let skip;
      let top;
      if (skip2 === undefined) skip = 0;
      else skip = skip2;
      if (top2 === undefined) top = 10;
      else top = top2;
      if (filter === undefined) {
        photoPosts.sort((a, b) => b.createdAt - a.createdAt);
        return photoPosts.slice(skip, top);
      }

      const d1 = new Date(filter.date1);
      const d2 = new Date(filter.date2);
      let newAr = photoPosts;
      if (filter.author !== undefined && filter.author !== "" && (typeof filter.author === "string")) {
        newAr = newAr.filter(obj => obj.author === filter.author);
      }
      if (filter.hashtags !== undefined && filter.hashtags instanceof Array) {
        newAr = newAr.filter((obj) => {
          if (obj.hashtags !== undefined) {
            for (let j = 0; j < filter.hashtags.length; j++) {
              const ind = obj.hashtags.findIndex(element => element === filter.hashtags[j]);
              if (ind === -1) return false;
            }
            return true;
          } return false;
        });
      }
      if (filter.date1 !== "" && filter.date2 !== "") {
        if ((d1 !== undefined) && (d2 !== undefined) && (d1 !== "") && (d2 !== "") && (d1 instanceof Date) && (d2 instanceof Date)) { newAr = newAr.filter(obj => (((obj.createdAt - d1) >= 0) && ((obj.createdAt - d2) <= 0))); }
      }
      return newAr.slice(skip, top);
    },

  };
}());
module.exports = Racoon;
