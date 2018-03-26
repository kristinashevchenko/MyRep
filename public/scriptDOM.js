"use strict";
const DOMs = (function() {
    let users = [];
    let posts = [];
    let user = JSON.parse(window.localStorage.getItem("user"));;
    let photos = document.createElement('div');
    photos.id = "photos";
    let photos2 = document.createElement('div');
    let photos22 = document.createElement('div');
    let start = 0,
        end = 10,
        currentId;
    let login, l, us, log, head, filter, all2, all, usname2, date2;
    let a, b, windows, yes, no, logok, rect, sure, ok, photoplace2, text2, descr2, buttonadd, post;
    let author, createdAt, id, photoLink, description, hashtags;
    window.localStorage.setItem("user", JSON.stringify(user));
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return {
        initComponents: function() {
            us = document.createElement('p');
            us.innerHTML = user;
            us.className = "user";
            log = document.createElement('div');
            log.className = "log";
            let logimg = document.createElement('img');
            logimg.className = "icon-style";
            logimg.src = "imagesnew.png";
            logimg.alt = "Exit";
            logimg.title = 'Click to exit';
            logimg.addEventListener('click', DOMs.logOut);
            head = document.createElement('div');
            head.className = "head";
            let headimg = document.createElement('img');
            headimg.className = "icon-style";
            headimg.src = "images21.png";
            headimg.alt = "New photo";
            headimg.title = 'Add photo';
            headimg.addEventListener('click', DOMs.addPhotoJS);
            login = document.createElement('a');
            login.className = "log2";
            login.innerHTML = "Log in";
            document.body.appendChild(us);

            log.appendChild(logimg);
            document.body.appendChild(log);

            head.appendChild(headimg);
            document.body.appendChild(head);

            document.body.appendChild(login);
            login.addEventListener('click', DOMs.loginClick);
            document.body.appendChild(photos);
            photos22.appendChild(photos2);
            document.body.appendChild(photos22);
            photos22.className = "ph";
            photos22.style.display = "none";

            let authoriz = document.createElement('h2');
            authoriz.innerHTML = "Authorization";
            authoriz.className = "authoriz";
            let text = document.createElement('p');
            text.innerHTML = "Welcome to RacoonApplication!" + "<br>" + "Please, enter login and password, that you should remember:)";
            text.className = "greettext";
            rect = document.createElement('div');
            rect.className = "authrect";
            let auth = document.createElement('form');
            let logout = document.createElement('p');
            logout.innerHTML = "Login";
            logout.className = "authtext";
            let logining = document.createElement('INPUT');
            logining.setAttribute("type", "text");
            logining.setAttribute("placeholder", "username");
            logining.setAttribute("size", "40%");
            logining.className = "authinputs";

            let passwout = document.createElement('p');
            passwout.innerHTML = "Password";
            passwout.className = "authtext";
            let passwin = document.createElement('input');
            passwin.setAttribute("type", "password");
            passwin.setAttribute("placeholder", "latinica and numbers");
            passwin.setAttribute("size", "40%");
            passwin.className = "authinputs";
            logok = document.createElement('button');
            logok.innerHTML = "OK";
            logok.className = "logokbutton";
            logok.addEventListener('click', DOMs.login);
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

            ok = document.createElement('button');
            ok.className = "okbutton";
            ok.innerHTML = "OK";
            b = document.createElement('div');
            b.id = "b";
            a = document.createElement('div');
            a.id = "a";
            windows = document.createElement('div');
            windows.id = "windows";
            yes = document.createElement('button');
            no = document.createElement('button');
            sure = document.createElement('p');
            sure.className = "modalwindtext";
            yes.className = "button";
            yes.innerHTML = "yes";
            no.innerHTML = "no";
            no.className = "button";
            yes.addEventListener('click', DOMs.hideAdel);
            no.addEventListener('click', DOMs.hideA);
            ok.addEventListener('click', DOMs.hideAo);
            windows.appendChild(sure);

            a.appendChild(windows);
            b.style.filter = "alpha(opacity=80)";
            b.style.opacity = 0.8;
            b.style.display = "block";
            a.style.display = "block";
            yes.style.display = "block";
            no.style.display = "block";
            a.style.top = "200px";

            DOMs.showPhotoPosts(Racoon.getPhotoPosts(start, end), start, end);
            DOMs.initElem(user);
        },
        initElem: function(user) {
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
                login.innerHTML = "Log in";
            }
        },
        logOut: function() {
            user = null;
            window.localStorage.setItem("user", JSON.stringify(user));
            photos22.style.display = "none";
            DOMs.initElem(user);
            DOMs.checkDeletes();
        },
        checkLikes: function() {
            let elems = document.getElementsByClassName("all");
            for (var i = 0; i < elems.length; i++) {
                let kollik = Racoon.numbLikes(elems[i].id);
                l = elems[i].children[0].children[0].children[0];
                l.innerHTML = kollik + "<br>" + "likes";
            }
        },
        loginClick: function() {
            if (login.innerHTML === "Back") {
                photos.style.display = "inline-block";
                login.innerHTML = "Log in"
                login.style.display = "none";
                rect.style.display = "none";
                DOMs.initElem(user);
                document.getElementsByClassName("authinputs")[1].value = "";
                document.getElementsByClassName("authinputs")[0].value = "";
                if (end < Racoon.getArSize())
                    SecondJS.hideFilter(false, false);
                else SecondJS.hideFilter(true, false);
                if (all2.innerHTML !== "") {
                    all2.innerHTML = "";
                    document.body.removeChild(all2);
                }
            } else if (login.innerHTML === "Log in") {
                photos.style.display = "none";
                login.innerHTML = "Back";
                SecondJS.hideFilter(true, true);
                rect.style.display = "inline-block";
            }

        },
        login: function() {
            var p = document.getElementsByClassName("authinputs")[1].value;
            var l = document.getElementsByClassName("authinputs")[0].value;
            users = JSON.parse(window.localStorage.getItem("users"));

            if (l !== "" && p !== "") {
                var index;
                if (users !== null) {
                    index = users.findIndex(function(element) {
                        return element.login === l;
                    });
                } else {
                    users = [];
                    index = -1;
                }
                if (index === -1) {

                    users.push({
                        login: l,
                        password: p
                    });
                    user = l;
                    window.localStorage.setItem("users", JSON.stringify(users));
                    users = [];
                    window.localStorage.setItem("user", JSON.stringify(user));
                    us.innerHTML = JSON.parse(window.localStorage.getItem("user"));
                    photos.style.display = "inline-block";
                    rect.style.display = "none";
                    DOMs.initElem(user);
                    document.getElementsByClassName("authinputs")[1].value = "";
                    document.getElementsByClassName("authinputs")[0].value = "";
                    if (end < Racoon.getArSize())
                        SecondJS.hideFilter(false, false);
                    else SecondJS.hideFilter(true, false);
                    DOMs.checkDeletes();
                } else if (users[index].password === p) {
                    user = l;

                    window.localStorage.setItem("user", JSON.stringify(user));
                    us.innerHTML = JSON.parse(window.localStorage.getItem("user"));
                    photos.style.display = "inline-block";
                    rect.style.display = "none";
                    DOMs.initElem(user);
                    document.getElementsByClassName("authinputs")[1].value = "";
                    document.getElementsByClassName("authinputs")[0].value = "";
                    if (end < Racoon.getArSize())
                        SecondJS.hideFilter(false, false);
                    else SecondJS.hideFilter(true, false);
                    DOMs.checkDeletes();
                } else {
                    sure.innerHTML = "Sorry, but such user is already exist or you entered wrong password.";
                    windows.appendChild(ok);
                    document.body.appendChild(b);
                    document.body.appendChild(a);
                }

            } else {
                sure.innerHTML = "Unfortunately,you entred invalid arguments.";
                windows.appendChild(ok);
                document.body.appendChild(b);
                document.body.appendChild(a);
            }

        },
        checkDeletes: function() {
            let elems = document.getElementsByClassName("all");
            for (var i = 0; i < elems.length; i++) {

                if (elems[i].children[0].children[1].children[0].innerHTML.split("<p>")[0] === user) {
                    elems[i].children[0].children[2].style.display = "inline-block";
                    elems[i].children[0].children[3].style.display = "inline-block";
                    elems[i].children[2].children[1].style.display = "inline-block";
                } else {
                    elems[i].children[0].children[2].style.display = "none";
                    elems[i].children[0].children[3].style.display = "none";
                    elems[i].children[2].children[1].style.display = "none";
                }
                if (user !== null)
                    elems[i].children[2].children[1].style.display = "inline-block";
            }

        },
        moreClick: function() {
            start += 10;
            end += 10;
            DOMs.showPhotoPosts(Racoon.getPhotoPosts(start, end, filter), start, end);
            if (end >= Racoon.getArSize())
                SecondJS.hideFilter(true, false);
        },
        workFilter: function(filt) {
            filter = filt;

            if (filter.isA === false && filter.isD === false && filter.isH === false) {
                photos.style.display = "inline-block";
                photos22.style.display = "none";
                DOMs.checkLikes();
            } else {
                end = 10;
                start = 0;
                photos.style.display = "none";

                photos2.innerHTML = "";
                photos22.style.display = "inline-block";
                let p1 = Racoon.getPhotoPosts(start, Racoon.getArSize(), filter);
                DOMs.showFilterPhotoPosts(p1, start, Racoon.getArSize());
                if (p1.length === 0) {
                    sure.innerHTML = "Sorry,but there are no posts to show";
                    windows.appendChild(ok);
                    document.body.appendChild(b);
                    document.body.appendChild(a);
                } else DOMs.checkLikes();
            }

        },
        showPhotoPosts: function(photoPosts, start, end) {
            if (end !== null && start !== null) {
                for (let i = 0; i < (end - start); i++) {
                    if (i < photoPosts.length)
                        photos.appendChild(DOMs.initDivPhoto(photoPosts[i]));
                }

            }

        },
        showFilterPhotoPosts: function(photoPosts, start, end) {
            if (end !== null && start !== null) {
                for (let i = 0; i < (end - start); i++) {
                    if (i < photoPosts.length)
                        photos2.appendChild(DOMs.initDivPhoto(photoPosts[i]));
                }

            }

        },
        addPhoto: function(photoPost) {
            if (Racoon.addPhotoPost(photoPost) === true) {
                posts = Racoon.getPhotoPosts(0, Racoon.getArSize());
                window.localStorage.setItem("photoPosts", JSON.stringify(posts));
                photos.removeChild(photos.lastElementChild);
                photos.insertBefore(DOMs.initDivPhoto(photoPost), photos.firstElementChild);
                return true;
            }
            return false;
        },
        addPhotoJS: function(post) {
            photos.style.display = "none";
            SecondJS.hideFilter(true, true);
            head.style.display = "none";
            log.style.display = "none";
            login.style.display = "inline-block";
            login.innerHTML = "Back";

            author = user;
            createdAt = new Date();
            id = String(Number(photos.firstElementChild.id) + 1);
            if (post.author !== undefined) {
                createdAt = post.createdAt;
                id = post.id;
            }

            all2 = document.createElement('div');
            all2.className = "all";
            let up = document.createElement('div');
            up.className = "up";
            let avatar = document.createElement('div');
            avatar.className = "avatar";
            let name = document.createElement('div');
            name.className = "name";
            usname2 = document.createElement('p');
            usname2.innerHTML = author;

            date2 = document.createElement('p');
            date2.innerHTML = createdAt.toLocaleString("en-US", options);
            usname2.appendChild(date2);
            name.appendChild(usname2);
            up.appendChild(avatar);
            up.appendChild(name);

            all2.appendChild(up);

            let photoplace = document.createElement('div');
            photoplace.className = "photoplace2";
            photoplace2 = document.createElement('img');
            photoplace2.className = "photo";
            let photo = document.createElement('input');
            photo.className = "textarea";
            photo.setAttribute("type", "file");
            photo.onchange = function() {
                let fileList = this.files;
                let textFile = fileList[0];
                photoplace2.src = textFile.name;
            };
            // photo.setAttribute("onchange", "DOMs.loadFile()");
            photoplace.appendChild(photoplace2);
            photoplace.appendChild(photo);
            all2.appendChild(photoplace);
            let down = document.createElement('div');
            down.className = "down";
            descr2 = document.createElement('textarea');
            descr2.className = "textarea";
            descr2.id = "textarea";
            text2 = document.createElement('input');
            text2.className = "textarea";
            descr2.setAttribute("placeholder", "Description...");
            descr2.setAttribute("maxlength", "200");
            descr2.setAttribute("rows", "4");
            text2.setAttribute("placeholder", "hashtag#hashtag");
            text2.setAttribute("type", "text");
            if (post.author !== undefined) {
                descr2.value = post.description;
                photoplace2.src = post.photoLink;
                if (post.hashtags !== undefined)
                    text2.value = post.hashtags.join("#");
            }
            photo.setAttribute("accept", "image/*");
            buttonadd = document.createElement('button');
            buttonadd.className = "button2";
            buttonadd.innerHTML = "Add";
            buttonadd.addEventListener('click', DOMs.addClick);
            let buttonedit = document.createElement('button');
            buttonedit.className = "button3";
            buttonedit.innerHTML = "Edit";
            buttonedit.addEventListener('click', DOMs.editClick);
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
        loadFile: function() {
            /*  var file = document.querySelector('input[type=file]').files[0];
              var reader = new FileReader();
              event.preventDefault();
              reader.addEventListener("load", function() {
                  //photoplace2.src = reader.result;
                  photoplace2.src = reader.readAsDataURL(file);
              }, false);*/

            /* if (file) {
                 reader.readAsDataURL(file);
             }*/
        },
        editClick: function() {
            photoLink = photoplace2.src;
            description = descr2.value;
            if (text2.value !== "")
                hashtags = text2.value.split("#");
            else hashtags = undefined;
            if (DOMs.editPhoto(currentId, {
                    photoLink: photoLink,
                    description: description,
                    hashtags: hashtags
                })) {
                photos.style.display = "inline-block";
                all2.innerHTML = "";
                document.body.removeChild(all2);
                SecondJS.hideFilter(false, false);
                head.style.display = "inline-block";
                log.style.display = "inline-block";
                login.style.display = "none";
                login.innerHTML = "Log in";

            } else {
                sure.innerHTML = "Unfortunately,you didn't enter description.";
                windows.appendChild(ok);
                document.body.appendChild(b);
                document.body.appendChild(a);
            }
        },
        addClick: function() {
            photoLink = photoplace2.src;
            description = document.getElementById("textarea").value;
            if (text2.value !== "")
                hashtags = text2.value.split("#");
            else hashtags = undefined;
            if (DOMs.addPhoto({
                    author: author,
                    id: id,
                    description: description,
                    photoLink: photoLink,
                    hashtags: hashtags,
                    createdAt: createdAt
                })) {
                photos.style.display = "inline-block";
                log.style.display = "inline-block";
                login.style.display = "none";
                login.innerHTML = "Log in";
                all2.innerHTML = "";
                document.body.removeChild(all2);
                SecondJS.hideFilter(false, false);
                head.style.display = "inline-block";
            } else {
                sure.innerHTML = "Unfortunately,you entered invalid arguments.Check your description/photoLink";
                windows.appendChild(ok);
                document.body.appendChild(b);
                document.body.appendChild(a);
            }
        },
        initDivPhoto: function(photoPost) {
            all = document.createElement('div');
            all.className = "all";
            all.id = photoPost.id;
            let up = document.createElement('div');
            up.className = "up";
            let avatar = document.createElement('div');
            avatar.className = "avatar";
            avatar.name = "likes";
            l = document.createElement('p');
            l.className = "textav";
            if (photoPost.likes !== undefined)
                l.innerHTML = photoPost.likes.length + "<br>" + "likes";
            avatar.appendChild(l);
            let name = document.createElement('div');
            name.className = "name";
            let usname = document.createElement('p');
            usname.innerHTML = photoPost.author;

            let date = document.createElement('p');
            date.innerHTML = photoPost.createdAt.toLocaleString("en-US", options);
            usname.appendChild(date);
            name.appendChild(usname);
            up.appendChild(avatar);
            up.appendChild(name);
            let settings = document.createElement('img');
            settings.className = "settings";
            settings.src = "settings.png";
            settings.title = "Edit";
            let delet = document.createElement('img');
            delet.className = "settings";
            delet.src = "delete.png";
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
            let photoplace = document.createElement('div');
            photoplace.className = "photoplace";
            let photo = document.createElement('img');
            photo.className = "photo";
            photo.src = photoPost.photoLink;
            photoplace.appendChild(photo);
            all.appendChild(photoplace);
            let down = document.createElement('div');
            down.className = "down";
            let descr = document.createElement('div');
            descr.className = "descr";
            let text = document.createElement('p');
            text.innerHTML = photoPost.description;
            descr.appendChild(text);
            if (photoPost.hashtags !== undefined) {
                let hashtags = document.createElement('b');
                hashtags.innerHTML = "#" + photoPost.hashtags.join("#");
                descr.appendChild(hashtags);
            }
            down.appendChild(descr);
            let like = document.createElement('img');
            like.src = "heart.png";
            like.className = "settings";
            like.alt = "Like";
            like.title = "Like!";
            down.appendChild(like);
            like.style.display = "none";
            if (user !== null) {
                like.style.display = "inline-block";
            }
            all.appendChild(down);
            all.addEventListener('click', DOMs.allClick);
            return all;
        },
        allClick: function() {
            if (event.target.title == "Like!") {
                if (user !== null) {
                    let kollik = Racoon.addLike(event.currentTarget.id, user);
                    l = event.currentTarget.children[0].children[0].children[0];
                    l.innerHTML = kollik + "<br>" + "likes";
                    window.localStorage.setItem("photoPosts", JSON.stringify(Racoon.getPhotoPosts(0, Racoon.getArSize())));
                }
            }
            if (event.target.title == "Delete") {
                sure.innerHTML = "Are you sure, that you want delete photo?";
                windows.appendChild(yes);
                windows.appendChild(no);
                document.body.appendChild(b);
                document.body.appendChild(a);
                currentId = event.currentTarget.id;
            }
            if (event.target.title == "Edit") {
                currentId = event.currentTarget.id;
                let temp2 = Racoon.getPhotoPost(currentId);
                DOMs.addPhotoJS(temp2);
            }
        },
        hideAdel: function() {
            DOMs.removePhoto(currentId);
            DOMs.hideA();
        },

        hideA: function() {
            document.body.removeChild(b);
            document.body.removeChild(a);
            windows.removeChild(yes);
            windows.removeChild(no);
        },
        hideAo: function() {
            document.body.removeChild(b);
            document.body.removeChild(a);
            windows.removeChild(ok);
        },
        removePhoto: function(id) {
            if ((id !== '') && (typeof id === 'string')) {
                let post = Racoon.getPhotoPost(id);
                if (Racoon.removePhotoPost(id) === true) {
                    photos.removeChild(document.getElementById(id));
                    let pos = JSON.parse(window.localStorage.getItem("delPosts"));
                    if (pos === null) pos = [];
                    pos.push(post);
                    window.localStorage.setItem("delPosts", JSON.stringify(pos));
                    window.localStorage.setItem("photoPosts", JSON.stringify(Racoon.getPhotoPosts(0, Racoon.getArSize())));
                    let ind = Racoon.getPhotoPostIndex(photos.lastElementChild.id);
                    if (ind !== 0) {
                        ind++;
                        start++;
                        end++;
                        photos.appendChild(DOMs.initDivPhoto(Racoon.getPhotoPostByIndex(ind)));
                    }
                }
            }
        },
        editPhoto: function(id, photoPost) {
            if (Racoon.editPhotoPost(id, photoPost)) {
                photos.replaceChild(DOMs.initDivPhoto(Racoon.getPhotoPost(id)), document.getElementById(id));

                window.localStorage.setItem("photoPosts", JSON.stringify(Racoon.getPhotoPosts(0, Racoon.getArSize())));
                return true;
            } else return false;
        },
        testing: function() {
            DOMs.initComponents();
        }
    };
}());