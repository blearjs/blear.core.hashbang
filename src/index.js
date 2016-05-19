/**
 * core hashbang
 * @author ydr.me
 * @create 2016-04-09 18:20
 *
 * hashbang 的格式为
 * #!/path/to/?query=string
 */


'use strict';

var hashstring = require('blear.utils.hashstring');
var url =        require('blear.utils.url');

var reHashbang = /#!\/.*$/;


/**
 * 设置 hash
 * @param hashbang
 * @returns {string}
 */
var setHashbang = exports.set = function (hashbang) {
    return '#!' + hashbang;
};


/**
 * 获取当前的 hashbang
 * @type {Function}
 * @returns {String}
 */
var getString = exports.toString = function () {
    var matches = location.hash.match(reHashbang);

    if (!matches) {
        return '/';
    }

    // 移除“#!”
    return matches[0].slice(2);
};


/**
 * 解析当前的 hashbang
 * @returns {{path, query}|{path: string, query: *}}
 */
var parse = exports.parse = function () {
    return hashstring.parse(getString());
};


/**
 * 获取当前 hashbang 的 path
 * @returns {*}
 */
exports.getPath = function () {
    return parse().path;
};


/**
 * 获取当前 hashbang 的 query
 * @param [key] {String} query 键名
 * @returns {Object|string|array}
 */
exports.getQuery = function (key) {
    var ret = parse().query;

    if (!key) {
        return ret;
    }

    return ret[key];
};


/**
 * 获取当前 hashbang 的 path
 * @parma path {string} path
 * @returns {string}
 */
exports.setPath = function (path) {
    var ret = parse();
    ret.path = path;
    return setHashbang(hashstring.stringify(ret));
};


/**
 * 设置当前 hashbang 的 query
 * @param key {String|Object} query 键名、键值对、字符串
 * @param [val] {String|Array|Number|Boolean} query 键值
 * @returns {string}
 */
exports.setQuery = function (key, val) {
    var ret = url.assignQuery(getString(), key, val);
    return setHashbang(ret);
};


/**
 * 移除当前 hashbang 的 query
 * @param key {String} query 键名
 * @returns {string}
 */
exports.removeQuery = function (key) {
    var ret = parse();
    ret.query[key] = null;
    return setHashbang(hashstring.stringify(ret));
};

