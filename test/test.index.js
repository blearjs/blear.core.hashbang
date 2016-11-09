/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var hashbang = require('../src/index.js');
var split = '!';

describe('测试文件', function () {
    var ha = '/a/b/c/?x=1&y=2&z=3';
    var buildURL = function (hb) {
        location.href = hashbang.set(hb, split);
    };


    it('.get', function () {
        expect(hashbang.get()).toEqual('/');
        buildURL(ha);
        console.log(location.href);
        expect(hashbang.get()).toEqual(ha);
    });

    it('.parse', function () {
        var ret = hashbang.parse();

        console.log(ret);

        expect(ret).toEqual({
            path: '/a/b/c/?x=1&y=2&z=3',
            href: '/a/b/c/?x=1&y=2&z=3',
            pathname: '/a/b/c/',
            query: {
                x: '1',
                y: '2',
                z: '3'
            }
        });
    });

    it('.getPathname', function () {
        expect(hashbang.getPathname()).toEqual('/a/b/c/');
    });

    it('.getQuery', function () {
        expect(hashbang.getQuery('x')).toEqual('1');
        expect(hashbang.getQuery('y')).toEqual('2');
        expect(hashbang.getQuery('z')).toEqual('3');
    });

    it('.setPathname', function () {
        expect(hashbang.setPathname('/o/p/q/', split)).toEqual(location.protocol + '//' + location.host + location.pathname + location.search + '#!/o/p/q/?x=1&y=2&z=3');
    });

    it('.setQuery', function () {
        var ret = hashbang.setQuery('x', [4, 5], split);

        console.log(ret);
        expect(/x=4/.test(ret)).toEqual(true);
        expect(/x=5/.test(ret)).toEqual(true);
    });

    it('.removeQuery', function () {
        var ret = hashbang.removeQuery('x');
        expect(/x=4/.test(ret)).toEqual(false);
        expect(/x=5/.test(ret)).toEqual(false);
    });
});
