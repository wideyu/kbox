var lenBing = 0;

function createNode(a) {
    return document.createElement(a)
}

function append(a, b) {
    return a.appendChild(b)
}

function getQueryVariable(a) {
    var b = window.location.search.substring(1);
    var c = b.split("&");
    for (var i = 0; i < c.length; i++) {
        var d = c[i].split("=");
        if (d[0] == a) {
            return d[1]
        }
    }
    return ("")
}

function setCookie(a, b, c) {
    var d = new Date();
    if (!c) {
        d.setTime(d.getTime() + d.getTime())
    } else {
        d.setTime(d.getTime() + (c * 24 * 60 * 60 * 1000))
    }
    var e = "expires=" + d.toGMTString();
    document.cookie = a + "=" + b + "; " + e
}

function getCookie(a) {
    var b = a + "=";
    var d = document.cookie.split(';');
    for (var i = 0; i < d.length; i++) {
        var c = d[i].trim();
        if (c.indexOf(b) == 0) return c.substring(b.length, c.length)
    }
    return ""
}
Array.prototype.insertRandomAfter = function(a, b) {
    if (!b) {
        this.splice(Math.floor(Math.random() * this.length), 0, a)
    } else {
        this.splice(b + 1 + Math.floor(Math.random() * (this.length - b - 1)), 0, a)
    }
};

function showSongs() {
    if (table.rows.length >= songs.length) return;
    for (var i = 0; i < songs.length; i++) {
        if (table.rows.length <= songs.length) {
            tr = table.insertRow(-1);
            tr.innerHTML = "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>"
        }
        tr = table.rows[i];
        tr.cells.item(0).innerHTML = songs[i].name
    }
    for (var i = songs.length; i < table.rows.length; i++) {
        if (table.rows.length > songs.length) {
            table.deleteRow(table.rows.length - 1)
        }
    }
}
var fmList = [];
var urlList = 'fmlist.json';
var pageIndex = 1;

function fetchFM() {
    var c = urlList;
    fetch(c).then(function(a) {
        return a.json()
    }).then(function(a) {
        var b = a.data.length;
        for (var i = 0; i < b; i++) {
            fmList.push({
                'fmid': a.data[i].fmid,
                'fmname': a.data[i].fmname
            })
        }
        if (pageIndex * 20 < a.recordcount) {
            pageIndex++;
            fetchFM()
        }
    })['catch'](function(a) {
        console.log(a);
        setTimeout(fetchFM, 3000)
    })
}
var offsets = '';
//https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery191011037639385629427_1649061322663&hash=32856ED5E34CFE975149EAD254A38528&dfid=3Mo1bY2loDLO0nZk3z3qbCYO&appid=1014&mid=c1743ffb0d6248ac82fffc6899d7f282&platid=4&album_id=964178&album_audio_id=32077008&_=1649061322668
var fmSongs = 'gateway/'; //'https://bird.ioliu.cn/v2?url=http://m.kugou.com/app/i/fmSongs.php?size=20';
var getSong = 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&appid=1014&mid=c1743ffb0d6248ac82fffc6899d7f282&platid=4';//https://bird.ioliu.cn/v2?url=http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=';

function addJavascriptFile(url, context) {
context = context || document;
var head = context.getElementsByTagName('head')[0];
var js = context.createElement('script');
js.src = url;
js.type = "text/JavaScript";
head.appendChild(js);
return js;
}

function getJsonp(url, handle) {
//creating random name of function as to not conflict with others
var func = 'jQuery' + Math.floor((Math.random() * 1000000000000000000) + 1);
//adding randomly created function to global window object
window[func] = function (data) {
//calling handle
handle(data);
//removing random named declared function
window[func] = function () {};
//removing added js
document.head.removeChild(js);
}
//manipulating and adding js file to head
var endurl = url.indexOf('?') != -1 ? url + '&callback=' + func : url + '?callback=' + func;
var js = addJavascriptFile(endurl);
}

function fetchSongs(f) {
    if (!f) {
        var f = localStorage.getItem("songsID");
        if (f == null) {
            f = 343
        }
    } else {
        if (f != localStorage.getItem("songsID")) {
            localStorage.setItem("songsID", f)
        }
    } if (offsets == '') {
        var d = new Date();
        //offsets = '%7B%22offset%22%3A0%2C%22time%22%3A' + Math.round(d.getTime() / 1000 - 3600) + '%7D'；
        offsets = Math.floor(Math.random() * 30) * 20
    }
    var g = fmSongs;
    g += f;
    g += '/';
    g += offsets;
    g += '.json';
    fetch(g).then(function(a) {
        return a.json()
    }).then(function(c) {
        offsets = c.data.offset;
        if (offsets > 600) {
            offsets = 0;
        }
        var d = 0;
        if (c.data.songlist) {
            d = c.data.songlist.length
        }
        var e = [];
        for (var i = 0; i < d; i++) {
            e.push(i)
        }
        while (e.length > 0) {
            i = Math.floor(Math.random() * e.length);
            getJsonp(getSong + '&hash=' + c.data.songlist[e[i]].audio_info.hash_128 + '&album_id=' + c.data.songlist[e[i]].album_info.album_id + '&album_audio_id=' + c.data.songlist[e[i]].album_audio_id, function(a) {
                if (a.err_code == 0) {
                    var b = a.data.play_url;
                    if (b.trim() != '') {
                        songs.push({
                            'name': a.data.audio_name,
                            'src': b
                        })
                    }
                } else {}
            });
            e.splice(i, 1)
        }
        if (songs.length == 0 && d == 0) {
            setTimeout(function() {
                fetchSongs(f)
            }, 3000)
        }
    })['catch'](function(a) {
        console.log(a);
        if (songs.length == 0) {
            setTimeout(fetchSongs, 300000)
        }
    })
}
var yottaCar = 'http://yottacar';
fetch('/cgi-bin/play.cgi').then(function(a) {
    return a.text()
}).then(function(a) {
    if (a.startsWith('yottaCar')) {
        yottaCar = ''
    }
});
var yottaCarIP = window.location.search.substring(1).split('&')[0].trim();
if (yottaCarIP) {
    fetch('http://' + yottaCarIP + '/cgi-bin/play.cgi').then(function(a) {
        return a.text()
    }).then(function(a) {
        if (a.startsWith('yottaCar')) {
            yottaCar = 'http://' + yottaCarIP
        }
    })
};

function playStart() {
    if (songs.length == 0) {
        setTimeout(playStart, 1000);
        return
    }
    kbox.addEventListener("ended", function() {
        playNextSongAuto()
    }, true);
    kbox.onplay = function() {
        gallery.ui.updatePlayPause();
        gallery.ui.updateIndexIndicator()
    };
    kbox.onpause = function() {
        gallery.ui.updatePlayPause()
    };
    if (indexPlay >= songs.length) indexPlay = 0;
    kbox.setAttribute("src", songs[indexPlay].src);
    document.getElementById('kbox').setAttribute("autoplay", 'autoplay');
    document.getElementById('kbox').load();
    document.getElementById('kbox').play();
    var b = yottaCar + '/cgi-bin/play.cgi?' + encodeURIComponent(songs[indexPlay].src.replace("https://", "http://"));
    fetch(b).then(function(a) {
        return a.text()
    }).then(function(a) {
        console.log(a)
    })['catch'](function(a) {
        console.log(a)
    })
}

function playNextSongAuto() {
    if (songs.length == 0) {
        setTimeout(playStart, 1000);
        return
    }
    indexPlay++;
    if (indexPlay + 20 > songs.length) fetchSongs();
    if (indexPlay >= songs.length) indexPlay = 0;
    kbox.setAttribute("src", songs[indexPlay].src);
    kbox.load();
    kbox.play();
    var b = yottaCar + "/cgi-bin/play.cgi?" + encodeURIComponent(songs[indexPlay].src.replace("https://", "http://"));
    fetch(b).then(function(a) {
        return a.text()
    }).then(function(a) {
        console.log(a)
    })['catch'](function(a) {
        console.log(a)
    })
}

function fetchBing(d) {
    if (window.location.host) {
        var e = "bing.json"
    } else {
        var e = "https://kbox.cn/bing.json"
    }
    fetch(e).then(function(a) {
        return a.json()
    }).then(function(a) {
        var b = 0;
        lenBing = 0;
        if (a.images) {
            b = a.images.length;
            lenBing = b;
            if (lenBing > 3) {
                lenBing = 3
            }
        }
        for (var i = 0; i < b; i++) {
            if (a.images[i].copyright) {
                var c = a.images[i].copyright + '\r\nbing.com'
            } else {
                var c = '\r\nbing.com'
            }
            item = {
                src: "https://cn.bing.com" + a.images[i].url,
                w: 1920,
                h: 1080,
                webpage: "https://cn.bing.com" + a.images[i].url,
                titl3: c
            };
            if (i < 2) {
                items[i] = item
            } else {
                gallery.items.insertRandomAfter(item, 1)
            }
        }
        gallery.invalidateCurrItems();
        gallery.updateSize(true)
    })['catch'](function(a) {
        console.log(a);
        setTimeout(fetchBing, 3000)
    })
}

function fetchPics(d) {
    if (window.location.host) {
        var e = "vladstudio.json"
    } else {
        var e = "https://kbox.cn/vladstudio.json"
    }
    fetch(e).then(function(a) {
        return a.json()
    }).then(function(a) {
        var b = 0;
        if (a.art) {
            b = a.art.length
        }
        for (var i = 0; i < b; i++) {
            if (a.art[i].name) {
                var c = a.art[i].name + '\r\nvlad.studio'
            } else {
                var c = a.art[i].name + '\r\nvlad.studio'
            }
            gallery.items.insertRandomAfter({
                src: a.art[i].wall_url,
                w: 1920,
                h: 1080,
                webpage: a.art[i].webpage,
                titl3: c
            }, lenBing - 1)
        }
        gallery.invalidateCurrItems();
        gallery.updateSize(true)
    })['catch'](function(a) {
        console.log(a);
        setTimeout(fetchPics, 3000)
    })
}

function fetchPixabay() {
    if (window.location.host) {
        var d = "pixabay.json"
    } else {
        var d = "https://kbox.cn/pixabay.json"
    }
    fetch(d).then(function(a) {
        return a.json()
    }).then(function(a) {
        var b = 0;
        if (a.hits) {
            b = a.hits.length
        }
        for (var i = 0; i < b; i++) {
            if (a.hits[i].tags) {
                var c = a.hits[i].tags + '\r\npixabay.com'
            } else {
                var c = 'pixabay.com'
            }
            gallery.items.insertRandomAfter({
                src: a.hits[i].largeImageURL,
                w: a.hits[i].webformatWidth,
                h: a.hits[i].webformatHeight,
                webpage: a.hits[i].pageURL,
                titl3: c,
                resize: true
            }, lenBing - 1)
        }
        gallery.invalidateCurrItems();
        gallery.updateSize(true)
    })['catch'](function(a) {
        console.log(a);
        setTimeout(fetchPixabay, 3000)
    })
}

function fetchUnsplash() {
    if (window.location.host) {
        var d = "unsplash.json"
    } else {
        var d = "https://kbox.cn/unsplash.json"
    }
    fetch(d).then(function(a) {
        return a.json()
    }).then(function(a) {
        var b = 0;
        if (a) {
            b = a.length
        }
        for (var i = 0; i < b; i++) {
            if (a[i].description) {
                var c = a[i].description + '\r\nunsplash.com'
            } else {
                var c = 'unsplash.com'
            }
            gallery.items.insertRandomAfter({
                src: a[i].urls.regular,
                w: a[i].width,
                h: a[i].height,
                webpage: a[i].links.html,
                titl3: c,
                resize: true
            }, lenBing - 1)
        }
        gallery.invalidateCurrItems();
        gallery.updateSize(true)
    })['catch'](function(a) {
        console.log(a);
        setTimeout(fetchUnsplash, 3000)
    })
}
