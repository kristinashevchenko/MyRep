/* eslint-disable no-unused-vars,prefer-destructuring */
const SecondJS = (function () {
  const more = document.getElementById("more");
  more.addEventListener("click", DOMs.moreClick);
  const filter = {
    author: "",
    date1: "",
    date2: "",
    hashtags: "",
    isA: false,
    isD: false,
    isH: false,
  };
  const filt = document.getElementsByClassName("filter")[0];
  return {
    okA() {
      if (document.getElementById("isAuthor").checked) {
        filter.author = document.getElementById("lastname").value;
        filter.isA = true;
      } else {
        filter.author = "";
        filter.isA = false;
      }
      DOMs.workFilter(filter);
    },
    okD() {
      if (document.getElementById("isDate").checked) {
        const d1 = document.getElementById("date1").value;
        filter.date1 = new Date(d1.replace(/(\d+).(\d+).(\d+)/, "$3/$2/$1"));
        filter.date2 = new Date((document.getElementById("date2").value).replace(/(\d+).(\d+).(\d+)/, "$3/$2/$1"));
        filter.isD = true;
      } else {
        filter.date1 = "";
        filter.date2 = "";
        filter.isD = false;
      }
      DOMs.workFilter(filter);
    },
    okH() {
      if (document.getElementById("isHash").checked) {
        const temp = document.getElementById("hashtag").value.split("#");
        for (let i = 0; i < temp.length; i++) {
          if (temp[i] === "" || temp[i] === " ") { temp.splice(i, 1); }
        }
        filter.hashtags = temp;
        filter.isH = true;
      } else {
        filter.hashtags = null;
        filter.isH = false;
      }
      DOMs.workFilter(filter);
    },
    hideFilter(f1, f2) {
      if (f1 === true) { more.style.display = "none"; } else more.style.display = "block";
      if (f2 === true) { filt.style.display = "none"; } else filt.style.display = "inline-block";
    },
  };
}());
