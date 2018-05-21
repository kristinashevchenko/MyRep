
// eslint-disable-next-line no-unused-vars
const Controller = (function () {
  return {
    getPost(id) {
      return new Promise(((resolve) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", `http://localhost:3000/post?id=${id}`, true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            resolve(xmlhttp.responseText);
          }
        };
        xmlhttp.send(null);
      }));
    },
    editPhoto(id, post) {
      return new Promise(((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        const json = JSON.stringify({
          id,
          post: JSON.stringify(post),
        });
        xmlhttp.open("PUT", "http://localhost:3000/post", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            resolve();
          } else reject();
        };
        xmlhttp.send(json);
      }));
    },
    getPosts(start, end, filter) {
      return new Promise(((resolve) => {
        const xmlhttp = new XMLHttpRequest();
        let posts;
        let json;
        if (filter === undefined) {
          json = JSON.stringify({
            skip: String(start),
            top: String(end),
          });
        } else {
          json = JSON.stringify({
            skip: String(start),
            top: String(end),
            filter: String(filter),
          });
        }
        xmlhttp.open("POST", "http://localhost:3000/posts", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            posts = JSON.parse(xmlhttp.responseText);
            resolve(posts);
            // Controller.getPosts(start,end);
          }
          // Controller.getPosts(start,end,filter);
        };
        xmlhttp.send(json);
      }));
    },
    removePost(id) {
      return new Promise(((resolve) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("DELETE", (`http://localhost:3000/post?id=${id}`), true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            resolve();
          }
        };
        xmlhttp.send(null);
      }));
    },
    postIndex(id) {
      return new Promise(((resolve) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", (`http://localhost:3000/postIndex?id=${id}`), true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            const ind = JSON.parse(xmlhttp.responseText);
            if (ind !== 0) {
              resolve(ind);
            }
          }
        };
        xmlhttp.send(null);
      }));
    },
    postByIndex(ind) {
      return new Promise(((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", (`http://localhost:3000/postByIndex?id=${ind}`), true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            const post = JSON.parse(xmlhttp.responseText);
            resolve(post);
          } else reject();
        };
        xmlhttp.send(null);
      }));
    },
    workFilter() {
      return new Promise(((resolve) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", ("http://localhost:3000/size"), true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            resolve(JSON.parse(xmlhttp.responseText));
          }
        };
        xmlhttp.send(null);
      }));
    },
    workFilter2(size, filter) {
      return new Promise(((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        let fposts;
        const json = JSON.stringify({
          skip: "0",
          top: String(size),
          filter: JSON.stringify(filter),
        });
        xmlhttp.open("POST", ("http://localhost:3000/posts"), true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            fposts = JSON.parse(xmlhttp.responseText);
            if (fposts.length !== 0) {
              const p = { posts: fposts, size };
              resolve(p);
            } else reject();
          }
        };
        xmlhttp.send(json);
      }));
    },
    numbLikes(elem) {
      return new Promise(((resolve) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", `http://localhost:3000/likes?id=${elem.id}`, true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            {
              const struct = {
                num: xmlhttp.responseText,
                elem,
              };
              resolve(struct);
            }
          }
        };
        xmlhttp.send(null);
      }));
    },
    loadFile(file) {
      return new Promise(((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/uploadImage", true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            resolve(file.name);
          } else {
            reject();
          }
        };
        xmlhttp.send(formData);
      }));
    },
    addPost(post) {
      return new Promise(((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        const json = JSON.stringify(post);
        xmlhttp.open("POST", "http://localhost:3000/post", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            resolve(post);
          } else {
            reject();
          }
        };
        xmlhttp.send(json);
      }));
    },
    getSize(end) {
      return new Promise(((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "http://localhost:3000/size", true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            if (end < Number(xmlhttp.responseText)) { resolve(); } else reject();
          }
        };
        xmlhttp.send(null);
      }));
    },
    addLike(ev, user) {
      return new Promise(((resolve) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", `http://localhost:3000/addlike?id=${ev.id}&user=${user}`, true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            {
              const struct = {
                num: xmlhttp.responseText,
                elem: ev,
              };
              resolve(struct);
            }
          }
        };
        xmlhttp.send(null);
      }));
    },
    getUser() {
      return new Promise(((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "http://localhost:3000/login", true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            const us = xmlhttp.responseText;

            resolve(us);
          } else reject();
        };
        xmlhttp.send(null);
      }));
    },
    logOut() {
      return new Promise(((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "http://localhost:3000/logout", true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            resolve();
          } else reject();
        };
        xmlhttp.send(null);
      }));
    },
    login(user) {
      return new Promise(((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        const json = JSON.stringify(user);
        xmlhttp.open("POST", "/login", true);
        xmlhttp.onload = function () {
          if (xmlhttp.status === 200) {
            resolve(user);
          } else {
            reject();
          }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=url-8");
        xmlhttp.send(json);
      }));
    },
  };
}());
