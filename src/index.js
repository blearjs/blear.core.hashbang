/**
 * core hashbang
 * @author ydr.me
 * @create 2016-04-09 18:20
 *
 * hashbang 的格式为
 * #!/path/to/?query=string
 */


'use strict';

var hashbangUtil = require('blear.utils.hashbang');
var url = require('blear.utils.url');
var access = require('blear.utils.access');
var typeis = require('blear.utils.typeis');
var object = require('blear.utils.object');

var PARSE_MAP = {
    href: 1,
    pathname: 2,
    query: 3
};


/**
 * 设置 hash
 * @param hashbang
 * @param [split] {String} 分隔符
 * @returns {string}
 */
var set = exports.set = function (hashbang, split) {
    return location.href.split('#')[0] + hashbangUtil.stringify(hashbang, split);
};


var setHashbang = function (ret, split) {
    return set(url.stringify(ret), split);
};


/**
 * 获取当前的 hashbang
 * @type {Function}
 * @returns {String}
 */
var get = exports.get = function () {
    return hashbangUtil.parse(location.hash);
};


/**
 * 解析当前的 hashbang
 * @returns {{path, query}|{path: string, query: *}}
 */
var parse = exports.parse = function () {
    var ret = object.filter(url.parse(get()), function (val, key) {
        return PARSE_MAP[key];
    });

    ret.path = ret.href;
    return ret;
};


/**
 * 获取当前 hashbang 的 pathname
 * @returns {String}
 */
exports.getPathname = function () {
    return parse().pathname;
};


/**
 * 获取当前 hashbang 的 query
 * @param [key] {String} query 键名
 * @returns {Object|string}
 */
exports.getQuery = function (key) {
    var ret = parse().query;

    if (!key) {
        return ret;
    }

    return ret[key];
};


/**
 * 获取当前 hashbang 的 pathname
 * @parma pathname {string} pathname
 * @param [split] {String} 分隔符
 * @returns {string}
 */
exports.setPathname = function (pathname, split) {
    var ret = parse();
    ret.path = '';
    ret.pathname = pathname;
    return setHashbang(ret, split);
};


/**
 * 设置当前 hashbang 的 query
 * @param key {String|Object} query 键名、键值对、字符串
 * @param [val] {String|Array|Number|Boolean} query 键值
 * @param [split] {String} 分隔符
 * @returns {string}
 */
exports.setQuery = function (key, val, split) {
    var args = access.args(arguments);

    // .setQuery({a: b});
    // .setQuery("a=b");
    // .setQuery("a", "b");
    // .setQuery({a: b}, "c");
    // .setQuery("a", "b", "c");
    if (args.length === 2 && typeis.Object(args[0])) {
        split = args[1];
    }

    var ret = url.setQuery(get(), key, val);
    return set(ret, split);
};


/**
 * 移除当前 hashbang 的 query
 * @param key {String} query 键名
 * @param [split] {String} 分隔符
 * @returns {string}
 */
exports.removeQuery = function (key, split) {
    var ret = url.removeQuery(get(), key);
    return set(ret, split);
};

