const Controller = (function () {
    return {
        getPost: function (id) {
            let xmlhttp2 = new XMLHttpRequest(), post22;

            xmlhttp2.open("GET", "http://localhost:3000/post?id=" + id, true);
            xmlhttp2.onload = function () {
                if (xmlhttp2.status == 200) {
                    post22 = xmlhttp2.responseText;
                    DOMs.addPhotoJS(post22);
                }
            };
            xmlhttp2.send(null);
        },
        editPhoto: function (id, post) {
            let xmlhttp = new XMLHttpRequest();

            var json = JSON.stringify({
                id: id,
                post: JSON.stringify(post)
            });
            xmlhttp.open("PUT", "http://localhost:3000/post", true);
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.onload = function () {
                if (xmlhttp.status == 200) {
                    let xmlhttp2 = new XMLHttpRequest(), post22;

                    xmlhttp2.open("GET", "http://localhost:3000/post?id=" + id, true);
                    xmlhttp2.onload = function () {
                        if (xmlhttp2.status == 200) {
                            post22 = xmlhttp2.responseText;
                            DOMs.editOk(post22);
                        }
                    };
                    xmlhttp2.send(null);
                }
                else DOMs.editFail();
            };
            xmlhttp.send(json);
        },
        moreClick: function (start, end, filter) {
            let xmlhttp = new XMLHttpRequest();

            var json = JSON.stringify({
                skip: String(start),
                top: String(end)
            });
            xmlhttp.open("POST", "http://localhost:3000/posts", true);
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.onload = function () {
                let posts22 = xmlhttp.responseText;
                let posts = JSON.parse(posts22);
                DOMs.showPhotoPosts(posts, start, end);
            };
            xmlhttp.send(json);
            let end2;
            xmlhttp.open("GET", "http://localhost:3000/size", true);
            xmlhttp.onload = function () {
                let end22 = xmlhttp.responseText;
                end2 = JSON.parse(end22);
                if (end >= end2)
                    SecondJS.hideFilter(true, false);
            };
            xmlhttp.send(null);

        },
        getPosts: function (start, end, filter) {
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
                posts22 = JSON.parse(xmlhttp.responseText);
                DOMs.showPhotoPosts(posts22, start, end);
            };
            xmlhttp.send(json);
            let xmlhttp2 = new XMLHttpRequest();

            xmlhttp2.open("GET", "http://localhost:3000/size", true);
            xmlhttp2.onload = function () {
                posts22 = JSON.parse(xmlhttp2.responseText);
                if (end >= posts22)
                    SecondJS.hideFilter(true, false);
            };
            xmlhttp2.send(null);
        },
        removePost: function (id) {
            let xmlhttp2 = new XMLHttpRequest(), ok = false;
            xmlhttp2.open("DELETE", ("http://localhost:3000/post?id=" + id), true);
            xmlhttp2.onload = function () {
                if (xmlhttp2.status == 200) {
                    let xmlhttp = new XMLHttpRequest(), ind;
                    xmlhttp.open("GET", ("http://localhost:3000/postIndex?id=" + id), true);
                    xmlhttp.onload = function () {
                        if (xmlhttp.status == 200) {
                            ind = JSON.parse(xmlhttp.responseText);
                            if (ind !== 0) {
                                let xmlhttp3 = new XMLHttpRequest();
                                ind++;
                                xmlhttp3.open("GET", ("http://localhost:3000/postByIndex?id=" + ind), true);
                                xmlhttp3.onload = function () {
                                    if (xmlhttp3.status == 200) {
                                        let post = JSON.parse(xmlhttp3.responseText);
                                        DOMs.removingChild(id, post);
                                    }
                                };
                                xmlhttp3.send(null);
                            }
                        }
                    };
                    xmlhttp.send(null);
                }
            };
            xmlhttp2.send(null);

        },
        workFilter: function (filter) {
            let xmlhttp2 = new XMLHttpRequest();
            xmlhttp2.open("GET", ("http://localhost:3000/size"), true);
            xmlhttp2.onload = function () {
                if (xmlhttp2.status == 200) {
                    let size = JSON.parse(xmlhttp2.responseText)
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
                                DOMs.showFilterPhotoPosts(fposts, 0, size);

                            }
                            else DOMs.windOk();
                        }
                    };
                    xmlhttp.send(json);
                }
            }
            xmlhttp2.send(null);
        },
        numbLikes: function (elem) {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "http://localhost:3000/likes?id=" + elem.id, true);
            xmlhttp.onload = function () {
                let num = xmlhttp.responseText;
                DOMs.writeLike(num, elem);
            };
            xmlhttp.send(null);
        },
        loadFile: function (file) {
            var formData = new FormData();
            formData.append('file', file);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/uploadImage', true);
            xhr.onload = function () {
                if (xhr.status == 200)
                    DOMs.setSrc(file.name);
            };
            xhr.send(formData);
        },
        addPost: function (post) {
            let xmlhttp = new XMLHttpRequest(), posts22, json;
            json = JSON.stringify(post);
            xmlhttp.open("POST", "http://localhost:3000/post", true);
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.onload = function () {
                if (xmlhttp.status == 200)
                    DOMs.addOk(post);
                else DOMs.addFail();
            };
            xmlhttp.send(json);

        },
        getSize: function (end) {
            let xmlhttp = new XMLHttpRequest(), posts22;

            xmlhttp.open("GET", "http://localhost:3000/size", true);
            xmlhttp.onload = function () {
                if (xmlhttp.status == 200) {
                    if (end < Number(xmlhttp.responseText))
                        SecondJS.hideFilter(false, false);
                    else
                        SecondJS.hideFilter(true, false);
                }
            };
            xmlhttp.send(null);
        },
        addLike: function (ev, user) {
            let xmlhttp2 = new XMLHttpRequest(), post22;
            xmlhttp2.open("GET", "http://localhost:3000/addlike?id=" + ev.id + "&user=" + user, true);
            xmlhttp2.onload = function () {
                if (xmlhttp2.status == 200) {
                    post22 = xmlhttp2.responseText;
                    DOMs.writeLike(post22, ev);
                }
            };
            xmlhttp2.send(null);
        },
    }
}());