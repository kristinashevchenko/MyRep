const fs = require('fs');
const path = "./server/data/posts.json";
const Racoon = (function () {
    let data = fs.readFileSync(path, 'utf8');
    let photoPosts = JSON.parse(data, function (key, value) {
        if (key == 'createdAt') return new Date(value);
        return value;
    });
    return {
        writeF: function () {
            fs.writeFileSync(path, JSON.stringify(photoPosts));
        },
        getArr: function () {
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            return photoPosts;
        },
        getPhotoPost: function (id) {
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            if (id !== null || id !== undefined) {
                var index = photoPosts.findIndex(function (element) {
                    return element.id === id;
                });
                return photoPosts[index];
            } else return undefined;
        },
        getPhotoPostIndex: function (id) {
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            if (id !== null || id !== undefined) {
                var index = photoPosts.findIndex(function (element) {
                    return element.id === id;
                });
                return index;
            } else return undefined;
        },
        getPhotoPostByIndex: function (index) {
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            if (index !== undefined && index >= 0 && index < photoPosts.length) {
                return photoPosts[index];
            } else return undefined;
        },
        validatePhotoPost: function (photoPost) {
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            let da = new Date(photoPost.createdAt);
            photoPost.createdAt = da;
            if (photoPost !== null) {
                if ((photoPost.id !== '') && (typeof photoPost.id === 'string')) {
                    var index = photoPosts.findIndex(function (element) {
                        return element.id === photoPost.id;
                    });
                    if (index == -1) {
                        if ((photoPost.description !== '') && (typeof photoPost.description === 'string' && String(photoPost.description).length < 200) && (photoPost.createdAt instanceof Date) && (photoPost.author !== '') &&
                            (typeof photoPost.author === 'string') && (photoPost.photoLink !== '') && (typeof photoPost.photoLink === 'string')) {
                            if (photoPost.likes !== undefined) {
                                if (!(photoPost.likes instanceof Array))
                                    return false;
                            }
                            if (photoPost.hashtags !== undefined) {
                                if (photoPost.hashtags instanceof Array)
                                    return true;
                                else return false;
                            }
                            return true;
                        } else return false;
                    } else return false;
                } else return false;
            } else return false;
        },

        addPhotoPost: function (photoPost) {
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            if (Racoon.validatePhotoPost(photoPost)) {
                photoPosts.unshift(photoPost);
                photoPosts.sort(function compareData(a, b) {
                    return b.createdAt - a.createdAt;
                });
                return true;
            } else return false;
        },

        removePhotoPost: function (id) {
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            var index = photoPosts.findIndex(function (element) {
                return element.id === id;
            });
            if (index === -1)
                return false;
            else {
                photoPosts.splice(index, 1);
                return true;
            }
        },

        editPhotoPost: function (id, photoPost) {
            let p = JSON.parse(photoPost);
            photoPost = p;
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            if (id !== undefined && photoPost !== undefined) {
                var index = photoPosts.findIndex(function (element) {
                    return element.id === id;
                });
                if (index !== -1) {
                    if (photoPost.description !== undefined) {
                        if ((photoPost.description !== '') && (typeof photoPost.description === 'string' && String(photoPost.description).length < 200))
                            photoPosts[index].description = photoPost.description;
                        else return false;
                    }
                    if (photoPost.photoLink !== undefined) {
                        if ((photoPost.photoLink !== '') && (typeof photoPost.photoLink === 'string'))
                            photoPosts[index].photoLink = photoPost.photoLink;
                        else return false;
                    }
                    if (photoPost.hashtags !== undefined && (photoPost.hashtags instanceof Array)) {
                        photoPosts[index].hashtags = photoPost.hashtags;
                    }
                    if (photoPost.likes !== undefined && (photoPost.likes instanceof Array)) {
                        if ((photoPost.likes.findIndex(function (element) {
                            return element === photoPosts[index].author;
                        }) === -1)) {
                            photoPosts[index].likes = photoPost.likes;
                            return true;
                        } else return false;
                    }
                    return true;
                } else return false;
            } else return false;
        },
        getArSize: function () {
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            return photoPosts.length;
        },
        addLike: function (id, user) {
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            var index = photoPosts.findIndex(function (element) {
                return element.id === id;
            });
            if (index !== -1) {
                if (photoPosts[index].likes !== undefined) {
                    let numb = photoPosts[index].likes.findIndex(function (element) {
                        return element === user;
                    });
                    if (numb === -1) {
                        photoPosts[index].likes.unshift(user);
                    } else photoPosts[index].likes.splice(numb, 1);
                } else photoPosts[index].likes = [user];

                return photoPosts[index].likes.length;
            }

        },
        numbLikes: function (id) {
            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            var index = photoPosts.findIndex(function (element) {
                return element.id === id;
            });
            if (photoPosts[index].likes === undefined) return 0;
            else return photoPosts[index].likes.length;
        },

        getPhotoPosts: function (skip, top, filter) {

            data = fs.readFileSync(path, 'utf8');
            photoPosts = JSON.parse(data, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            if (skip === undefined) skip = 0;
            if (top === undefined) top = 10;
            if (filter === undefined) {
                photoPosts.sort(function compareData(a, b) {
                    return b.createdAt - a.createdAt;
                });
                return photoPosts.slice(skip, top);
            } else {

                let d1 = new Date(filter.date1), d2 = new Date(filter.date2);
                var newAr = photoPosts;
                if (filter.author !== undefined && filter.author !== '' && (typeof filter.author === 'string'))
                    newAr = newAr.filter(function (obj) {
                        return obj.author === filter.author;
                    });
                if (filter.hashtags !== undefined && filter.hashtags instanceof Array)
                    newAr = newAr.filter(function (obj) {
                        if (obj.hashtags !== undefined) {
                            for (var j = 0; j < filter.hashtags.length; j++) {
                                var ind = obj.hashtags.findIndex(function (element) {
                                    return element === filter.hashtags[j];
                                });
                                if (ind === -1) return false;
                            }
                            return true;
                        } else return false;
                    });
                if (filter.date1 !== "" && filter.date2 !== "")
                    if ((d1 !== undefined) && (d2 !== undefined) && (d1 !== '') && (d2 !== '') && (d1 instanceof Date) && (d2 instanceof Date))
                        newAr = newAr.filter(function (obj) {
                            return (((obj.createdAt - d1) >= 0) && ((obj.createdAt - d2) <= 0));
                        });
                return newAr.slice(skip, top);
            }
        },

    }
}());
module.exports = Racoon;