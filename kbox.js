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
//'https://bird.ioliu.cn/v2?url=http://m.kugou.com/app/i/fmSongs.php?size=20';
var fmSongs = 'gateway/'; 
//https://bird.ioliu.cn/v2?url=http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=';
//https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery191011037639385629427_1649061322663&hash=32856ED5E34CFE975149EAD254A38528&dfid=3Mo1bY2loDLO0nZk3z3qbCYO&appid=1014&mid=c1743ffb0d6248ac82fffc6899d7f282&platid=4&album_id=964178&album_audio_id=32077008&_=1649061322668
var getSong = 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&appid=1014&platid=4';
getSong += '&dfid=' + (Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2)).substr(0,24);
var Guid: function() {
        function e() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    },
    Md5: function(e) {
        var t, n = 0, o = 8;
        function a(e, t, r, i, n, o) {
            return m((o = m(m(t, e), m(i, o))) << (n = n) | o >>> 32 - n, r)
        }
        function u(e, t, r, i, n, o, s) {
            return a(t & r | ~t & i, e, t, n, o, s)
        }
        function l(e, t, r, i, n, o, s) {
            return a(t & i | r & ~i, e, t, n, o, s)
        }
        function p(e, t, r, i, n, o, s) {
            return a(t ^ r ^ i, e, t, n, o, s)
        }
        function f(e, t, r, i, n, o, s) {
            return a(r ^ (t | ~i), e, t, n, o, s)
        }
        function m(e, t) {
            var r = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
        }
        return e = e ? function(e) {
            for (var t = n ? "0123456789ABCDEF" : "0123456789abcdef", r = "", i = 0; i < 4 * e.length; i++)
                r += t.charAt(e[i >> 2] >> i % 4 * 8 + 4 & 15) + t.charAt(e[i >> 2] >> i % 4 * 8 & 15);
            return r
        }(function(e, t) {
            e[t >> 5] |= 128 << t % 32,
            e[14 + (t + 64 >>> 9 << 4)] = t;
            for (var r = 1732584193, i = -271733879, n = -1732584194, o = 271733878, s = 0; s < e.length; s += 16) {
                var a = r
                  , g = i
                  , c = n
                  , d = o;
                r = u(r, i, n, o, e[s + 0], 7, -680876936),
                o = u(o, r, i, n, e[s + 1], 12, -389564586),
                n = u(n, o, r, i, e[s + 2], 17, 606105819),
                i = u(i, n, o, r, e[s + 3], 22, -1044525330),
                r = u(r, i, n, o, e[s + 4], 7, -176418897),
                o = u(o, r, i, n, e[s + 5], 12, 1200080426),
                n = u(n, o, r, i, e[s + 6], 17, -1473231341),
                i = u(i, n, o, r, e[s + 7], 22, -45705983),
                r = u(r, i, n, o, e[s + 8], 7, 1770035416),
                o = u(o, r, i, n, e[s + 9], 12, -1958414417),
                n = u(n, o, r, i, e[s + 10], 17, -42063),
                i = u(i, n, o, r, e[s + 11], 22, -1990404162),
                r = u(r, i, n, o, e[s + 12], 7, 1804603682),
                o = u(o, r, i, n, e[s + 13], 12, -40341101),
                n = u(n, o, r, i, e[s + 14], 17, -1502002290),
                i = u(i, n, o, r, e[s + 15], 22, 1236535329),
                r = l(r, i, n, o, e[s + 1], 5, -165796510),
                o = l(o, r, i, n, e[s + 6], 9, -1069501632),
                n = l(n, o, r, i, e[s + 11], 14, 643717713),
                i = l(i, n, o, r, e[s + 0], 20, -373897302),
                r = l(r, i, n, o, e[s + 5], 5, -701558691),
                o = l(o, r, i, n, e[s + 10], 9, 38016083),
                n = l(n, o, r, i, e[s + 15], 14, -660478335),
                i = l(i, n, o, r, e[s + 4], 20, -405537848),
                r = l(r, i, n, o, e[s + 9], 5, 568446438),
                o = l(o, r, i, n, e[s + 14], 9, -1019803690),
                n = l(n, o, r, i, e[s + 3], 14, -187363961),
                i = l(i, n, o, r, e[s + 8], 20, 1163531501),
                r = l(r, i, n, o, e[s + 13], 5, -1444681467),
                o = l(o, r, i, n, e[s + 2], 9, -51403784),
                n = l(n, o, r, i, e[s + 7], 14, 1735328473),
                i = l(i, n, o, r, e[s + 12], 20, -1926607734),
                r = p(r, i, n, o, e[s + 5], 4, -378558),
                o = p(o, r, i, n, e[s + 8], 11, -2022574463),
                n = p(n, o, r, i, e[s + 11], 16, 1839030562),
                i = p(i, n, o, r, e[s + 14], 23, -35309556),
                r = p(r, i, n, o, e[s + 1], 4, -1530992060),
                o = p(o, r, i, n, e[s + 4], 11, 1272893353),
                n = p(n, o, r, i, e[s + 7], 16, -155497632),
                i = p(i, n, o, r, e[s + 10], 23, -1094730640),
                r = p(r, i, n, o, e[s + 13], 4, 681279174),
                o = p(o, r, i, n, e[s + 0], 11, -358537222),
                n = p(n, o, r, i, e[s + 3], 16, -722521979),
                i = p(i, n, o, r, e[s + 6], 23, 76029189),
                r = p(r, i, n, o, e[s + 9], 4, -640364487),
                o = p(o, r, i, n, e[s + 12], 11, -421815835),
                n = p(n, o, r, i, e[s + 15], 16, 530742520),
                i = p(i, n, o, r, e[s + 2], 23, -995338651),
                r = f(r, i, n, o, e[s + 0], 6, -198630844),
                o = f(o, r, i, n, e[s + 7], 10, 1126891415),
                n = f(n, o, r, i, e[s + 14], 15, -1416354905),
                i = f(i, n, o, r, e[s + 5], 21, -57434055),
                r = f(r, i, n, o, e[s + 12], 6, 1700485571),
                o = f(o, r, i, n, e[s + 3], 10, -1894986606),
                n = f(n, o, r, i, e[s + 10], 15, -1051523),
                i = f(i, n, o, r, e[s + 1], 21, -2054922799),
                r = f(r, i, n, o, e[s + 8], 6, 1873313359),
                o = f(o, r, i, n, e[s + 15], 10, -30611744),
                n = f(n, o, r, i, e[s + 6], 15, -1560198380),
                i = f(i, n, o, r, e[s + 13], 21, 1309151649),
                r = f(r, i, n, o, e[s + 4], 6, -145523070),
                o = f(o, r, i, n, e[s + 11], 10, -1120210379),
                n = f(n, o, r, i, e[s + 2], 15, 718787259),
                i = f(i, n, o, r, e[s + 9], 21, -343485551),
                r = m(r, a),
                i = m(i, g),
                n = m(n, c),
                o = m(o, d)
            }
            return Array(r, i, n, o)
        }(function(e) {
            for (var t = Array(), r = (1 << o) - 1, i = 0; i < e.length * o; i += o)
                t[i >> 5] |= (e.charCodeAt(i / o) & r) << i % 32;
            return t
        }(t = e), t.length * o)) : ""
    }
getSong += '&mid=' + Md5(Guid());

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
var func = 'jQuery' + Math.floor((Math.random()+1) * 10000000000000000) + '_' + (new Date().getTime());
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
