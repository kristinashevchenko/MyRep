/* eslint-disable no-restricted-globals,prefer-destructuring */

const DOMs = (function () {
  let user = null;

  const photos = document.createElement("div");

  photos.id = "photos";
  const photos2 = document.createElement("div");
  const photos22 = document.createElement("div");
  let start = 0;
  let end = 10;
  let currentId;
  let login;
  let l;
  let us;
  let log;
  let head;
  let filter = {
    author: "",
    date1: "",
    date2: "",
    hashtags: "",
    isA: false,
    isD: false,
    isH: false,
  };
  let all2;
  let all;
  let usname2;
  let date2;
  let a;
  let b;
  let windows;
  let yes;
  let no;
  let logok;
  let rect;
  let sure;
  let ok;
  let photoplace2;
  let text2;
  let descr2;
  let buttonadd;
  let author;
  let createdAt;
  let id;
  let photoLink;
  let description;
  let hashtags;
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };


  return {
    initComponents() {
      us = document.createElement("p");
      const makeRequest4 = async () => {
        user = await Controller.getUser();

        DOMs.initComponents2();
        DOMs.initComponents3();
        DOMs.initComponents4();
      };
      makeRequest4().catch(() => {
        user = null;

        DOMs.initComponents2();
        DOMs.initComponents3();
        DOMs.initComponents4();
      });
    },
    initComponents2() {
      us.textContent = user;
      us.className = "user";
      log = document.createElement("div");
      log.className = "log";
      const logimg = document.createElement("img");
      logimg.className = "icon-style";
      logimg.src = "style/imagesnew.png";
      logimg.alt = "Exit";
      logimg.title = "Click to exit";
      logimg.addEventListener("click", DOMs.logOut);
      head = document.createElement("div");
      head.className = "head";
      const headimg = document.createElement("img");
      headimg.className = "icon-style";
      headimg.src = "style/images21.png";
      headimg.alt = "New photo";
      headimg.title = "Add photo";
      headimg.addEventListener("click", DOMs.addPhotoJS);
      login = document.createElement("a");
      login.className = "log2";
      login.textContent = "Log in";
      document.body.appendChild(us);

      log.appendChild(logimg);
      document.body.appendChild(log);

      head.appendChild(headimg);
      document.body.appendChild(head);

      document.body.appendChild(login);
      login.addEventListener("click", DOMs.loginClick);
      document.body.appendChild(photos);
      photos22.appendChild(photos2);
      document.body.appendChild(photos22);
      photos22.className = "ph";
      photos22.style.display = "none";
    },
    initComponents3() {
      const authoriz = document.createElement("h2");
      authoriz.textContent = "Authorization";
      authoriz.className = "authoriz";
      const text = document.createElement("p");
      text.innerHTML = "Welcome to RacoonApplication!<br>Please, enter login and password, that you should remember:)";
      text.className = "greettext";
      rect = document.createElement("div");
      rect.className = "authrect";
      const auth = document.createElement("form");
      const logout = document.createElement("p");
      logout.textContent = "Login";
      logout.className = "authtext";
      const logining = document.createElement("INPUT");
      logining.setAttribute("type", "text");
      logining.setAttribute("placeholder", "username");
      logining.setAttribute("size", "40%");
      logining.className = "authinputs";

      const passwout = document.createElement("p");
      passwout.textContent = "Password";
      passwout.className = "authtext";
      const passwin = document.createElement("input");
      passwin.setAttribute("type", "password");
      passwin.setAttribute("placeholder", "latinica and numbers");
      passwin.setAttribute("size", "40%");
      passwin.className = "authinputs";
      logok = document.createElement("button");
      logok.textContent = "OK";
      logok.className = "logokbutton";
      logok.addEventListener("click", DOMs.login);
      auth.appendChild(logout);
      auth.appendChild(logining);
      auth.appendChild(passwout);
      auth.appendChild(passwin);

      authoriz.appendChild(text);
      authoriz.appendChild(auth);
      authoriz.appendChild(logok);
      rect.appendChild(authoriz);
      rect.style.display = "none";
      document.body.insertBefore(rect, photos);
    },
    initComponents4() {
      ok = document.createElement("button");
      ok.className = "okbutton";
      ok.textContent = "OK";
      b = document.createElement("div");
      b.id = "b";
      a = document.createElement("div");
      a.id = "a";
      windows = document.createElement("div");
      windows.id = "windows";
      yes = document.createElement("button");
      no = document.createElement("button");
      sure = document.createElement("p");
      sure.className = "modalwindtext";
      yes.className = "button";
      yes.textContent = "yes";
      no.textContent = "no";
      no.className = "button";
      yes.addEventListener("click", DOMs.hideAdel);
      no.addEventListener("click", DOMs.hideA);
      ok.addEventListener("click", DOMs.hideAo);
      windows.appendChild(sure);

      a.appendChild(windows);
      b.style.filter = "alpha(opacity=80)";
      b.style.opacity = 0.8;
      b.style.display = "block";
      a.style.display = "block";
      yes.style.display = "block";
      no.style.display = "block";
      a.style.top = "200px";

      const makeRequest2 = async () => {
        const posts = await Controller.getPosts(start, end);
        DOMs.showPhotoPosts(posts);
        await Controller.getSize(end);
        SecondJS.hideFilter(false, false);
      };
      makeRequest2().catch(() => {
        SecondJS.hideFilter(true, false);
      });
      DOMs.initElem();
    },
    initElem() {
      if (user !== null) {
        login.style.display = "none";
        us.style.display = "inline-block";
        log.style.display = "inline-block";
        head.style.display = "inline-block";
      } else {
        us.style.display = "none";
        log.style.display = "none";
        head.style.display = "none";
        login.style.display = "inline-block";
        login.textContent = "Log in";
      }
    },
    logOut() {
      const makeRequest3 = async () => {
        await Controller.logOut();
        user = null;
        photos22.style.display = "none";
        DOMs.initElem();
        DOMs.checkDeletes();
      };
      makeRequest3().catch(() => {

      });
    },
    checkLikes() {
      const elems = document.getElementsByClassName("all");
      for (let i = 0; i < elems.length; i++) {
        const makeRequest = async () => {
          const p = await Controller.numbLikes(elems[i]);
          DOMs.writeLike(p.num, p.elem);
        };
        makeRequest();
      }
    },
    loginClick() {
      if (login.textContent === "Back") {
        photos.style.display = "inline-block";
        login.textContent = "Log in";
        login.style.display = "none";
        rect.style.display = "none";
        DOMs.initElem();
        document.getElementsByClassName("authinputs")[1].value = "";
        document.getElementsByClassName("authinputs")[0].value = "";

        const makeRequest3 = async () => {
          await Controller.getSize(end);
          SecondJS.hideFilter(false, false);
        };
        makeRequest3().catch(() => {
          SecondJS.hideFilter(true, false);
        });
        if (all2.innerHTML !== "") {
          all2.innerHTML = "";
          document.body.removeChild(all2);
        }
      } else if (login.textContent === "Log in") {
        photos.style.display = "none";
        login.textContent = "Back";
        SecondJS.hideFilter(true, true);
        rect.style.display = "inline-block";
      }
    },
    login() {
      const p = document.getElementsByClassName("authinputs")[1].value;
      const l1 = document.getElementsByClassName("authinputs")[0].value;
      const user2 = { username: l1, password: p };
      if (l1 !== "" && p !== "") {
        const makeRequest = async () => {
          const us2 = await Controller.login(user2);
          DOMs.loginOk(us2);
        };
        makeRequest().catch(() => {
          DOMs.loginFail();
        });
      } else {
        sure.textContent = "Unfortunately,you entred invalid arguments.";
        windows.appendChild(ok);
        document.body.appendChild(b);
        document.body.appendChild(a);
      }
    },
    loginFail() {
      sure.textContent = "Unfortunately,you entred wrong password/invalid login";
      windows.appendChild(ok);
      document.body.appendChild(b);
      document.body.appendChild(a);
    },
    loginOk(user2) {
      user = user2.username;
      //  window.localStorage.setItem("user", JSON.stringify(user));
      us.textContent = String(user);
      photos.style.display = "inline-block";
      rect.style.display = "none";
      DOMs.initElem();
      document.getElementsByClassName("authinputs")[1].value = "";
      document.getElementsByClassName("authinputs")[0].value = "";
      const makeRequest3 = async () => {
        await Controller.getSize(end);
        SecondJS.hideFilter(false, false);
      };
      makeRequest3().catch(() => {
        SecondJS.hideFilter(true, false);
      });
      DOMs.checkDeletes();
    },
    checkDeletes() {
      const elems = document.getElementsByClassName("all");
      for (let i = 0; i < elems.length; i++) {
        if (elems[i].children[0].children[1].children[0].innerHTML.split("<p>")[0] === user) {
          elems[i].children[0].children[2].style.display = "inline-block";
          elems[i].children[0].children[3].style.display = "inline-block";
          elems[i].children[2].children[1].style.display = "inline-block";
        } else {
          elems[i].children[0].children[2].style.display = "none";
          elems[i].children[0].children[3].style.display = "none";
          elems[i].children[2].children[1].style.display = "none";
        }
        if (user !== null) { elems[i].children[2].children[1].style.display = "inline-block"; }
      }
    },
    moreClick() {
      start += 10;
      end += 10;
      if (filter.isA === false && filter.isD === false && filter.isH === false) {
        const makeRequest2 = async () => {
          const posts = await Controller.getPosts(start, end);
          DOMs.showPhotoPosts(posts);
          await Controller.getSize(end);
          SecondJS.hideFilter(false, false);
        };
        makeRequest2().catch(() => {
          SecondJS.hideFilter(true, false);
        });
      } else {
        const makeRequest = async () => {
          const posts = await Controller.getPosts(start, end, filter);
          DOMs.showPhotoPosts(posts);
          await Controller.getSize(end);
          SecondJS.hideFilter(false, false);
        };
        makeRequest().catch(() => {
          SecondJS.hideFilter(true, false);
        });
      }
    },
    workFilter(filt) {
      filter = filt;
      if ((filter.isA === false && filter.isD === false && filter.isH === false)) {
        photos.style.display = "inline-block";
        photos22.style.display = "none";
        const makeRequest3 = async () => {
          await Controller.getSize(end);
          SecondJS.hideFilter(false, false);
        };
        makeRequest3().catch(() => {
          SecondJS.hideFilter(true, false);
        });
        DOMs.checkLikes();
      } else {
        end = 10;
        start = 0;
        photos.style.display = "none";

        photos2.innerHTML = "";
        photos22.style.display = "inline-block";
        const makeRequest = async () => {
          const re = await Controller.workFilter();
          const re2 = await Controller.workFilter2(re, filter);
          DOMs.showFilterPhotoPosts(re2.posts, 0, re2.size);
          if (re2.posts.length >= 10) {
            SecondJS.hideFilter(true, false);
          } else SecondJS.hideFilter(false, false);
        };
        makeRequest().catch(() => {
          DOMs.windOk();
        });
        DOMs.checkLikes();
      }
    },
    windOk() {
      sure.textContent = "Sorry,but there are no posts to show";
      windows.appendChild(ok);
      document.body.appendChild(b);
      document.body.appendChild(a);
    },
    showPhotoPosts(photoPosts) {
      if (end !== null && start !== null) {
        for (let i = 0; i < (end - start); i++) {
          if (i < photoPosts.length) { photos.appendChild(DOMs.initDivPhoto(photoPosts[i])); }
        }
      }
    },
    showFilterPhotoPosts(photoPosts, start2, end2) {
      if (end2 !== null && start2 !== null) {
        for (let i = 0; i < (end2 - start2); i++) {
          if (i < photoPosts.length) { photos2.appendChild(DOMs.initDivPhoto(photoPosts[i])); }
        }
      }
    },
    addPhotoJS(post) {
      let p;
      if (typeof post === "string") {
        p = JSON.parse(post, (key, value) => {
          if (key === "createdAt") return new Date(value);
          return value;
        });
        post = p;
      }
      photos.style.display = "none";
      SecondJS.hideFilter(true, true);
      head.style.display = "none";
      log.style.display = "none";
      login.style.display = "inline-block";
      login.textContent = "Back";

      author = user;
      createdAt = new Date();
      id = String(Number(photos.firstElementChild.id) + 1);
      if (post.author !== undefined) {
        createdAt = post.createdAt;
        id = post.id;
      }

      all2 = document.createElement("div");
      all2.className = "all";
      const up = document.createElement("div");
      up.className = "up";
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      const name = document.createElement("div");
      name.className = "name";
      usname2 = document.createElement("p");
      usname2.textContent = author;
      date2 = document.createElement("p");
      date2.textContent = createdAt.toLocaleString("en-US", options);
      usname2.appendChild(date2);
      name.appendChild(usname2);
      up.appendChild(avatar);
      up.appendChild(name);

      all2.appendChild(up);

      const photoplace = document.createElement("div");
      photoplace.className = "photoplace2";
      photoplace2 = document.createElement("img");
      photoplace2.className = "photo";
      const photo = document.createElement("input");
      photo.className = "textarea";
      photo.setAttribute("type", "file");
      let textFile;
      photo.onchange = function () {
        const fileList = this.files;
        textFile = fileList[0];
        const makeRequest = async () => {
          DOMs.setSrc(await Controller.loadFile(textFile));
        };
        makeRequest();
      };
      photoplace.appendChild(photoplace2);
      photoplace.appendChild(photo);
      all2.appendChild(photoplace);
      const down = document.createElement("div");
      down.className = "down";
      descr2 = document.createElement("textarea");
      descr2.className = "textarea";
      descr2.id = "textarea";
      text2 = document.createElement("input");
      text2.className = "textarea";
      descr2.setAttribute("placeholder", "Description...");
      descr2.setAttribute("maxlength", "200");
      descr2.setAttribute("rows", "4");
      text2.setAttribute("placeholder", "hashtag#hashtag");
      text2.setAttribute("type", "text");
      if (post.author !== undefined) {
        descr2.value = post.description;
        photoplace2.src = post.photoLink;
        if (post.hashtags !== undefined) { text2.value = post.hashtags.join("#"); }
      }
      photo.setAttribute("accept", "image/*");
      buttonadd = document.createElement("button");
      buttonadd.className = "button2";
      buttonadd.textContent = "Add";
      buttonadd.addEventListener("click", DOMs.addClick);
      const buttonedit = document.createElement("button");
      buttonedit.className = "button3";
      buttonedit.textContent = "Edit";
      buttonedit.addEventListener("click", DOMs.editClick);
      buttonadd.style.display = "inline-block";
      buttonedit.style.display = "none";
      if (post.author !== undefined) {
        buttonedit.style.display = "inline-block";
        buttonadd.style.display = "none";
      }
      down.appendChild(descr2);
      down.appendChild(text2);
      down.appendChild(buttonedit);
      down.appendChild(buttonadd);
      all2.appendChild(down);
      document.body.insertBefore(all2, photos);
    },
    setSrc(photo) {
      photoplace2.src = photo;
    },
    editClick() {
      photoLink = photoplace2.src;
      description = descr2.value;
      if (text2.value !== "") { hashtags = text2.value.split("#"); } else hashtags = undefined;
      const makeRequest = async () => {
        await Controller.editPhoto(currentId, {
          photoLink,
          description,
          hashtags,
        });
        const re2 = await Controller.getPost(id);
        DOMs.editOk(re2);
      };
      makeRequest().catch(() => {
        DOMs.editFail();
      });
    },
    editOk(post) {
      const p = JSON.parse(post, (key, value) => {
        if (key === "createdAt") return new Date(value);
        return value;
      });
      post = p;
      photos.replaceChild(DOMs.initDivPhoto(post), document.getElementById(id));
      photos.style.display = "inline-block";
      all2.innerHTML = "";
      document.body.removeChild(all2);
      SecondJS.hideFilter(false, false);
      head.style.display = "inline-block";
      log.style.display = "inline-block";
      login.style.display = "none";
      login.textContent = "Log in";
    },
    editFail() {
      sure.textContent = "Unfortunately,you didn't enter description.";
      windows.appendChild(ok);
      document.body.appendChild(b);
      document.body.appendChild(a);
    },
    addOk(photoPost) {
      photos.removeChild(photos.lastElementChild);
      photos.insertBefore(DOMs.initDivPhoto(photoPost), photos.firstElementChild);
      photos.style.display = "inline-block";
      log.style.display = "inline-block";
      login.style.display = "none";
      login.textContent = "Log in";
      all2.innerHTML = "";
      document.body.removeChild(all2);
      SecondJS.hideFilter(false, false);
      head.style.display = "inline-block";
    },
    addFail() {
      sure.textContent = "Unfortunately,you entered invalid arguments.Check your description/photoLink";
      windows.appendChild(ok);
      document.body.appendChild(b);
      document.body.appendChild(a);
    },
    addClick() {
      photoLink = photoplace2.src;
      description = document.getElementById("textarea").value;
      if (text2.value !== "") { hashtags = text2.value.split("#"); } else hashtags = undefined;
      const makeRequest = async () => {
        DOMs.addOk(await Controller.addPost({
          author,
          id,
          description,
          photoLink,
          hashtags,
          createdAt,
        }));
      };
      makeRequest().catch(() => {
        DOMs.addFail();
      });
    },
    initDivPhoto(photoPost) {
      all = document.createElement("div");
      all.className = "all";
      all.id = photoPost.id;
      const up = document.createElement("div");
      up.className = "up";
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.name = "likes";
      l = document.createElement("p");
      l.className = "textav";
      if (photoPost.likes !== undefined) { l.innerHTML = `${photoPost.likes.length}<br>likes`; }
      avatar.appendChild(l);
      const name = document.createElement("div");
      name.className = "name";
      const usname = document.createElement("p");
      usname.textContent = photoPost.author;

      const date = document.createElement("p");
      const d = new Date(photoPost.createdAt);
      date.textContent = d.toLocaleString("en-US", options);
      usname.appendChild(date);
      name.appendChild(usname);
      up.appendChild(avatar);
      up.appendChild(name);
      const settings = document.createElement("img");
      settings.className = "settings";
      settings.src = "style/settings.png";
      settings.title = "Edit";
      const delet = document.createElement("img");
      delet.className = "settings";
      delet.src = "style/delete.png";
      delet.title = "Delete";
      up.appendChild(settings);
      up.appendChild(delet);
      delet.style.display = "none";
      settings.style.display = "none";

      if (user === photoPost.author) {
        delet.style.display = "inline-block";
        settings.style.display = "inline-block";
      }
      all.appendChild(up);
      const photoplace = document.createElement("div");
      photoplace.className = "photoplace";
      const photo = document.createElement("img");
      photo.className = "photo";
      photo.src = photoPost.photoLink;
      photoplace.appendChild(photo);
      all.appendChild(photoplace);
      const down = document.createElement("div");
      down.className = "down";
      const descr = document.createElement("div");
      descr.className = "descr";
      const text = document.createElement("p");
      text.textContent = photoPost.description;
      descr.appendChild(text);
      if (photoPost.hashtags !== undefined) {
        const hashtags2 = document.createElement("b");
        hashtags2.textContent = `#${photoPost.hashtags.join("#")}`;
        descr.appendChild(hashtags2);
      }
      down.appendChild(descr);
      const like = document.createElement("img");
      like.src = "style/heart.png";
      like.className = "settings";
      like.alt = "Like";
      like.title = "Like!";
      down.appendChild(like);
      like.style.display = "none";
      if (user !== null) {
        like.style.display = "inline-block";
      }
      all.appendChild(down);
      all.addEventListener("click", DOMs.allClick);
      return all;
    },
    writeLike(kol, ev) {
      l = ev.children[0].children[0].children[0];
      l.innerHTML = `${kol}<br>likes`;
    },
    allClick() {
      if (event.target.title === "Like!") {
        if (user !== null) {
          const makeRequest = async () => {
            const p = await Controller.addLike(event.currentTarget, user);
            DOMs.writeLike(p.num, p.elem);
          };
          makeRequest();
        }
      }
      if (event.target.title === "Delete") {
        sure.textContent = "Are you sure, that you want delete photo?";
        windows.appendChild(yes);
        windows.appendChild(no);
        document.body.appendChild(b);
        document.body.appendChild(a);
        currentId = event.currentTarget.id;
      }
      if (event.target.title === "Edit") {
        currentId = event.currentTarget.id;
        const makeRequest = async () => {
          DOMs.addPhotoJS(await Controller.getPost(currentId));
        };
        makeRequest();
      }
    },
    hideAdel() {
      DOMs.removePhoto(currentId);
      DOMs.hideA();
    },
    hideA() {
      document.body.removeChild(b);
      document.body.removeChild(a);
      windows.removeChild(yes);
      windows.removeChild(no);
    },
    hideAo() {
      document.body.removeChild(b);
      document.body.removeChild(a);
      windows.removeChild(ok);
    },
    removePhoto(id2) {
      if ((id2 !== "") && (typeof id2 === "string")) {
        const makeRequest = async () => {
          await Controller.removePost(id2);
          const re2 = await Controller.postByIndex(document.getElementsByClassName("all").length - 1);
          DOMs.removingChild(id2, re2);
        };
        makeRequest().catch(() => {
          DOMs.removingChild(id2);
          // DOMs.editFail();
        });
      }
    },
    removingChild(id2, postt) {
      photos.removeChild(document.getElementById(id2));
      if (postt !== undefined) { photos.appendChild(DOMs.initDivPhoto(postt)); }
    },
    testing() {
      DOMs.initComponents();
    },
  };
}());
