const Controller = (function () {
    return {
        getPost: function (id) {
            return new Promise(function (resolve, reject) {
                let xmlhttp2 = new XMLHttpRequest();
                xmlhttp2.open("GET", "http://localhost:3000/post?id=" + id, true);
                xmlhttp2.onload = function () {
                    if (xmlhttp2.status == 200) {
                        resolve(xmlhttp2.responseText);
                    }
                };
                xmlhttp2.send(null);
            });
        },
        editPhoto: function (id, post) {
            return new Promise(function (resolve, reject) {
                let xmlhttp = new XMLHttpRequest();
                var json = JSON.stringify({
                    id: id,
                    post: JSON.stringify(post)
                });
                xmlhttp.open("PUT", "http://localhost:3000/post", true);
                xmlhttp.setRequestHeader('Content-Type', 'application/json');
                xmlhttp.onload = function () {
                    if (xmlhttp.status == 200) {
                        resolve();
                    }
                    else reject();
                };
                xmlhttp.send(json);
            });
        },
        getPosts: function (start, end, filter) {
            return new Promise(function (resolve, reject) {
                let xmlhttp = new XMLHttpRequest(), posts22, json;
                if (filter === undefined)
                    json = JSON.stringify({
                        skip: String(start),
                        top: String(end)
                    });
                else
                    json = JSON.stringify({
                        skip: String(start),
                        top: String(end),
                        filter: String(filter)
                    });
                xmlhttp.open("POST", "http://localhost:3000/posts", true);
                xmlhttp.setRequestHeader('Content-Type', 'application/json');
                xmlhttp.onload = function () {
                    if (xmlhttp.status == 200) {
                        posts22 = JSON.parse(xmlhttp.responseText);
                        DOMs.showPhotoPosts(posts22, start, end);
                        resolve();
                        //Controller.getPosts(start,end);
                    }
                    // setTimeout(Controller.getPosts(start,end),1000);
                };
                xmlhttp.send(json);
            });
        },
        removePost: function (id) {
            return new Promise(function (resolve, reject) {
                let xmlhttp2 = new XMLHttpRequest();
                xmlhttp2.open("DELETE", ("http://localhost:3000/post?id=" + id), true);
                xmlhttp2.onload = function () {
                    if (xmlhttp2.status == 200) {
                        resolve();
                    }
                };
                xmlhttp2.send(null);
            });
        },
        postIndex: function (id) {
            return new Promise(function (resolve, reject) {
                let xmlhttp = new XMLHttpRequest(), ind;
                xmlhttp.open("GET", ("http://localhost:3000/postIndex?id=" + id), true);
                xmlhttp.onload = function () {
                    if (xmlhttp.status == 200) {
                        ind = JSON.parse(xmlhttp.responseText);
                        if (ind !== 0) {
                            resolve(ind);
                        }
                    }
                };
                xmlhttp.send(null);
            });
        },
        postByIndex: function (ind) {
            return new Promise(function (resolve, reject) {
                let xmlhttp3 = new XMLHttpRequest();
                ind++;
                xmlhttp3.open("GET", ("http://localhost:3000/postByIndex?id=" + ind), true);
                xmlhttp3.onload = function () {
                    if (xmlhttp3.status == 200) {
                        let post = JSON.parse(xmlhttp3.responseText);
                        resolve(post);
                    }
                };
                xmlhttp3.send(null);
            });
        },
        workFilter: function (filter) {
            return new Promise(function (resolve, reject) {
                let xmlhttp2 = new XMLHttpRequest();
                xmlhttp2.open("GET", ("http://localhost:3000/size"), true);
                xmlhttp2.onload = function () {
                    if (xmlhttp2.status == 200) {
                        resolve(JSON.parse(xmlhttp2.responseText));
                    }
                };
                xmlhttp2.send(null);
            });
        },
        workFilter2: function (size, filter) {
            return new Promise(function (resolve, reject) {
                let xmlhttp = new XMLHttpRequest(), fposts;
                let json = JSON.stringify({
                    skip: "0",
                    top: String(size),
                    filter: JSON.stringify(filter)
                });
                xmlhttp.open("POST", ("http://localhost:3000/posts"), true);
                xmlhttp.setRequestHeader('Content-Type', 'application/json');
                xmlhttp.onload = function () {
                    if (xmlhttp.status == 200) {
                        fposts = JSON.parse(xmlhttp.responseText);
                        if (fposts.length !== 0) {
                            let p = {posts: fposts, size: size};
                            resolve(p);
                        }
                        else reject();
                    }
                };
                xmlhttp.send(json);
            });
        },
        numbLikes: function (elem) {
            return new Promise(function (resolve, reject) {
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", "http://localhost:3000/likes?id=" + elem.id, true);
                xmlhttp.onload = function () {
                    if (xmlhttp.status == 200) {
                        {
                            let p = {
                                num: xmlhttp.responseText,
                                elem: elem
                            };
                            resolve(p);
                        }
                    }
                };
                xmlhttp.send(null);
            });
        },
        loadFile: function (file) {
            return new Promise(function (resolve, reject) {
                var formData = new FormData();
                formData.append('file', file);
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open('POST', '/uploadImage', true);
                xmlhttp.onload = function () {
                    if (xmlhttp.status == 200) {
                        resolve(file.name);
                    }
                    else {
                        reject();
                    }
                };
                xmlhttp.send(formData);
            });
        },
        addPost: function (post) {
            return new Promise(function (resolve, reject) {
                let xmlhttp = new XMLHttpRequest(), json;
                json = JSON.stringify(post);
                xmlhttp.open("POST", "http://localhost:3000/post", true);
                xmlhttp.setRequestHeader('Content-Type', 'application/json');
                xmlhttp.onload = function () {
                    if (xmlhttp.status == 200) {
                        resolve(post);
                    }
                    else {
                        reject();
                    }
                };
                xmlhttp.send(json);
            });
        },
        getSize: function (end) {
            return new Promise(function (resolve, reject) {
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", "http://localhost:3000/size", true);
                xmlhttp.onload = function () {
                    if (xmlhttp.status == 200) {
                        if (end < Number(xmlhttp.responseText))
                            resolve();
                        else reject();
                    }
                };
                xmlhttp.send(null);
            });
        },
        addLike: function (ev, user) {
            return new Promise(function (resolve, reject) {
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", "http://localhost:3000/addlike?id=" + ev.id + "&user=" + user, true);
                xmlhttp.onload = function () {
                    if (xmlhttp.status == 200) {
                        {
                            let p = {
                                num: xmlhttp.responseText,
                                elem: ev
                            };
                            resolve(p);
                        }
                    }
                };
                xmlhttp.send(null);
            });
        },
    }
}());