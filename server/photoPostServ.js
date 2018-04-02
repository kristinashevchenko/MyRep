const fs = require('fs');
const path="./server/data/posts.json";
const Racoon = (function() {
   let data=fs.readFileSync(path, 'utf8');
   let photoPosts=JSON.parse(data);
    return {
        writeF:function(){
            fs.writeFileSync(path,JSON.stringify(photoPosts));
        },
        getArr: function() {
            return photoPosts;
        },
        getPhotoPost: function(id) {
            if (id !== null || id !== undefined) {
                var index = photoPosts.findIndex(function(element) {
                    return element.id === id;
                });
                return photoPosts[index];
            } else return undefined;
        },
        getPhotoPostIndex: function(id) {
            if (id !== null || id !== undefined) {
                var index = photoPosts.findIndex(function(element) {
                    return element.id === id;
                });
                return index;
            } else return undefined;
        },
        getPhotoPostByIndex: function(index) {
            if (index !== undefined && index >= 0 && index < photoPosts.length) {
                return photoPosts[index];
            } else return undefined;
        },
        validatePhotoPost: function(photoPost) {
            if (photoPost !== null) {
                if ((photoPost.id !== '') && (typeof photoPost.id === 'string')) {
                    var index = photoPosts.findIndex(function(element) {
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

        addPhotoPost: function(photoPost) {
            if (Racoon.validatePhotoPost(photoPost)) {
                photoPosts.unshift(photoPost);
                photoPosts.sort(function compareData(a, b) {
                    return b.createdAt - a.createdAt;
                });
                return true;
            } else return false;
        },

        removePhotoPost: function(id) {
            var index = photoPosts.findIndex(function(element) {
                return element.id === id;
            });
            if (index === -1)
                return false;
            else {
                photoPosts.splice(index, 1);
                return true;
            }
        },

        editPhotoPost: function(id, photoPost) {
            if (id !== undefined && photoPost !== undefined) {
                var index = photoPosts.findIndex(function(element) {
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
                        if ((photoPost.likes.findIndex(function(element) {
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
        getArSize: function() {
            return photoPosts.length;
        },
        addLike: function(id, user) {
            var index = photoPosts.findIndex(function(element) {
                return element.id === id;
            });
            if (index !== -1) {
                if (photoPosts[index].likes !== undefined) {
                    let numb = photoPosts[index].likes.findIndex(function(element) {
                        return element === user;
                    });
                    if (numb === -1) {
                        photoPosts[index].likes.unshift(user);
                    } else photoPosts[index].likes.splice(numb, 1);
                } else photoPosts[index].likes = [user];

                return photoPosts[index].likes.length;
            }

        },
        numbLikes: function(id) {
            var index = photoPosts.findIndex(function(element) {
                return element.id === id;
            });
            if (photoPosts[index].likes === undefined) return 0;
            else return photoPosts[index].likes.length;
        },

        getPhotoPosts: function(skip, top, filter) {
            if (skip === undefined) skip = 0;
            if (top === undefined) top = 10;
            if (filter === undefined) {
                photoPosts.sort(function compareData(a, b) {
                    return b.createdAt - a.createdAt;
                });
                return photoPosts.slice(skip, top);
            } else {
                var newAr = photoPosts;
                if (filter.author !== undefined && filter.author !== '' && (typeof filter.author === 'string'))
                    newAr = newAr.filter(function(obj) {
                        return obj.author === filter.author;
                    });
                if (filter.hashtags !== undefined && filter.hashtags instanceof Array)
                    newAr = newAr.filter(function(obj) {
                        if (obj.hashtags !== undefined) {
                            for (var j = 0; j < filter.hashtags.length; j++) {
                                var ind = obj.hashtags.findIndex(function(element) {
                                    return element === filter.hashtags[j];
                                });
                                if (ind === -1) return false;
                            }
                            return true;
                        } else return false;
                    });
                if ((filter.date1 !== undefined) && (filter.date2 !== undefined) && (filter.date1 !== '') && (filter.date2 !== '') && (filter.date1 instanceof Date) && (filter.date2 instanceof Date))
                    newAr = newAr.filter(function(obj) {
                        return (((obj.createdAt - filter.date1) >= 0) && ((obj.createdAt - filter.date2) <= 0));
                    });
                return newAr.slice(skip, top);
            }
        },
        
    }
}());
module.exports=Racoon;