"use strict";
const Racoon = (function () {
    var photoPosts = JSON.parse(window.localStorage.getItem("photoPosts"), function (key, value) {
        if (key == 'createdAt') return new Date(value);
        return value;
    });
    var photoPosts2 = [{
        id: '1',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-12T20:00:00'),
        author: 'Egorka',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashtags: ['sport', 'life'],
        likes: ['Ivan', 'Masha03']
    },
        {
            id: '3',
            description: 'В здоровом теле здоровый дух',
            createdAt: new Date('2018-02-14T18:20:00'),
            author: 'Kirill12',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashtags: ['sport', 'life'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '4',
            description: 'Больше не могу придумывать подписи...',
            createdAt: new Date('2018-02-14T20:05:00'),
            author: 'Maxxxx',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashtags: ['sport', 'life'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '5',
            description: 'Классный кот.',
            createdAt: new Date('2018-02-14T21:20:00'),
            author: 'Violette',
            photoLink: 'http://murkote.com/wp-content/uploads/2013/11/chem-kormit-siamskogo-kotenka.jpg',
            hashtags: ['sport'],
            likes: '289'
        },
        {
            id: '6',
            description: 'Very beautiful.',
            createdAt: new Date('2018-02-14T22:00:00'),
            author: 'Leo',
            photoLink: 'https://likeni.info/wp-content/uploads/2017/01/1-33.jpg',
            hashtags: ['sport', 'life'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '7',
            description: 'Hello',
            createdAt: new Date('2018-02-14T23:00:00'),
            author: 'Olya',
            photoLink: 'https://kulturologia.ru/files/u18476/adorable-dogs-9.jpg',
            hashtags: ['sport', 'life'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '8',
            description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-02-15T06:08:00'),
            author: 'Lerka2000',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashtags: ['sport', 'life'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '9',
            description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-02-15T07:40:00'),
            author: 'Kristina',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashtags: ['sport', 'life'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '10',
            description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-02-15T10:00:00'),
            author: 'Иванов23',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            hashtags: ['sport', 'life'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '11',
            description: 'Have a rest with my family.',
            createdAt: new Date('2018-02-15T11:17:00'),
            author: 'Katya',
            photoLink: 'p10.jpg',
            hashtags: ['family', 'love', 'relax', 'nature'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '12',
            description: 'Very exciting!',
            createdAt: new Date('2018-02-17T21:14:00'),
            author: 'Ivan26',
            photoLink: 'p9.jpg',
            hashtags: ['nature', 'water', 'shocked'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '13',
            description: 'My own UFO!)',
            createdAt: new Date('2018-02-18T18:28:00'),
            author: 'Anechka',
            photoLink: 'p8.jpg',
            hashtags: ['ufo', 'funny', 'child', 'dream'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '14',
            description: 'Do what you want.',
            createdAt: new Date('2018-02-19T05:56:00'),
            author: 'Nastya',
            photoLink: 'p7.jpg',
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '15',
            description: 'So cute!)',
            createdAt: new Date('2018-02-19T16:34:00'),
            author: 'Igorek',
            photoLink: 'p6.jpg',
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '16',
            description: 'Spring is coming',
            createdAt: new Date('2018-02-19T20:12:00'),
            author: 'Sanya01',
            photoLink: "p5.jpg",
            hashtags: ['spring', 'flower', 'happy'],
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '17',
            description: 'A perfect place to relax from others.',
            createdAt: new Date('2018-02-19T23:46:00'),
            author: 'Kosten',
            photoLink: 'p4.jpg',
            likes: ['Ivan', 'Masha03']
        },
        {
            id: '18',
            description: 'Just me and that tree...',
            createdAt: new Date('2018-02-21T08:23:00'),
            author: 'Juliet',
            photoLink: 'p3.jpg',
            hashtags: ['nature'],
            likes: ['Ivan', 'Masha03']
        }
    ];
    if (photoPosts === null) {
        window.localStorage.setItem("photoPosts", JSON.stringify(photoPosts2));
        photoPosts = photoPosts2;
    }
    return {
        getArr: function () {
            return photoPosts;
        },
        getPhotoPost: function (id) {
            if (id !== null || id !== undefined) {
                var index = photoPosts.findIndex(function (element) {
                    return element.id === id;
                });
                return photoPosts[index];
            } else return undefined;
        },
        getPhotoPostIndex: function (id) {
            if (id !== null || id !== undefined) {
                var index = photoPosts.findIndex(function (element) {
                    return element.id === id;
                });
                return index;
            } else return undefined;
        },
        getPhotoPostByIndex: function (index) {
            if (index !== undefined && index >= 0 && index < photoPosts.length) {
                return photoPosts[index];
            } else return undefined;
        },
        validatePhotoPost: function (photoPost) {
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
            if (Racoon.validatePhotoPost(photoPost)) {
                photoPosts.unshift(photoPost);
                photoPosts.sort(function compareData(a, b) {
                    return b.createdAt - a.createdAt;
                });
                return true;
            } else return false;
        },

        removePhotoPost: function (id) {
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
            return photoPosts.length;
        },
        addLike: function (id, user) {
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
            var index = photoPosts.findIndex(function (element) {
                return element.id === id;
            });
            if (photoPosts[index].likes === undefined) return 0;
            else return photoPosts[index].likes.length;
        },

        getPhotoPosts: function (skip, top, filter) {
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
                if ((filter.date1 !== undefined) && (filter.date2 !== undefined) && (filter.date1 !== '') && (filter.date2 !== '') && (filter.date1 instanceof Date) && (filter.date2 instanceof Date))
                    newAr = newAr.filter(function (obj) {
                        return (((obj.createdAt - filter.date1) >= 0) && ((obj.createdAt - filter.date2) <= 0));
                    });
                return newAr.slice(skip, top);
            }
        },
        test: function () {
        }
    }
}());