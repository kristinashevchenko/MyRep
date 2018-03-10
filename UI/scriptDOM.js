const DOMs = (function() {
    let user = "Kristina Shevchenko";
    let photos = document.createElement('div');
    photos.id = "photos";
    return {
        initElem: function(user) {
            if (user !== null) {
                let us = document.createElement('p');
                us.innerHTML = user;
                us.className = "user";
                document.body.appendChild(us);
                let log = document.createElement('div');
                log.className = "log";
                let logimg = document.createElement('img');
                logimg.className = "icon-style";
                logimg.src = "imagesnew.png";
                logimg.alt = "Exit";
                logimg.title = 'Click to exit';
                log.appendChild(logimg);
                document.body.appendChild(log);
                let head = document.createElement('div');
                head.className = "head";
                let headimg = document.createElement('img');
                headimg.className = "icon-style";
                headimg.src = "images21.png";
                headimg.alt = "New photo";
                headimg.title = 'Add photo';
                head.appendChild(headimg);
                document.body.appendChild(head);
            }
        },
        showPhotoPosts(photoPosts, start, end) {
            if (end !== null && start !== null) {
                for (let i = 0; i < (end - start); i++) {
                    if (i < photoPosts.length)
                        photos.appendChild(DOMs.initDivPhoto(photoPosts[i]));
                }
                document.body.appendChild(photos);
            }
        },
        addPhoto: function(photoPost) {
            if (Racoon.addPhotoPost(photoPost) === true) {
                photos.removeChild(photos.lastElementChild);
                photos.insertBefore(DOMs.initDivPhoto(photoPost), photos.firstElementChild);
            }
        },
        initDivPhoto: function(photoPost) {
            let all = document.createElement('div');
            all.className = "all";
            all.id = photoPost.id;
            let up = document.createElement('div');
            up.className = "up";
            let avatar = document.createElement('div');
            avatar.className = "avatar";
            avatar.name = "likes";
            let l = document.createElement('p');
            l.className = "textav";
            if (photoPost.likes !== undefined)
                l.innerHTML = photoPost.likes.length + "<br>" + "likes";
            avatar.appendChild(l);
            let name = document.createElement('div');
            name.className = "name";
            let usname = document.createElement('p');
            usname.innerHTML = photoPost.author;
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
            let date = document.createElement('p');
            date.innerHTML = photoPost.createdAt.toLocaleString("en-US", options);
            usname.appendChild(date);
            name.appendChild(usname);
            up.appendChild(avatar);
            up.appendChild(name);
            if (user !== null) {
                let settings = document.createElement('img');
                settings.className = "settings";
                settings.src = "settings.png";
                let delet = document.createElement('img');
                delet.className = "settings";
                delet.src = "delete.png";
                up.appendChild(settings);
                up.appendChild(delet);
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
            if (user !== null) {
                let like = document.createElement('img');
                like.src = "heart.png";
                like.className = "settings";
                like.alt = "Like";
                like.title = "Like!";
                down.appendChild(like);
            }
            all.appendChild(down);
            return all;
        },
        removePhoto: function(id) {
            if ((id !== '') && (typeof id === 'string') && Racoon.removePhotoPost(id)) {
                photos.removeChild(document.getElementById(id));
            }
        },
        editPhoto: function(id, photoPost) {
            Racoon.editPhotoPost(id, photoPost);
            photos.replaceChild(DOMs.initDivPhoto(Racoon.getPhotoPost(id)), document.getElementById(id));
        },
        testing: function() {
            DOMs.initElem(user);
            DOMs.showPhotoPosts(Racoon.getPhotoPosts(0, 10), 0, 10);
            console.log("Add new photo post");
            console.log(DOMs.addPhoto({
                id: "22",
                author: "admin",
                createdAt: new Date(),
                description: "Just added photo post.",
                hashtags: ["new", "post"],
                photoLink: "p4.jpg"
            }));
            console.log("Remove photo post");
            console.log(DOMs.removePhoto("17"));
            console.log("Edit photo post");
            console.log(DOMs.editPhoto("16", {
                description: "Changed description."
            }));

        }
    };

}());