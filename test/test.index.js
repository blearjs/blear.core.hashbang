/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var hashbang = require('../src/index.js');

describe('测试文件', function () {
    var ha = '/a/b/c/?x=1&y=2&z=3';
    var buildURL = function (hashstring) {
        location.hash = location.pathname + '#!' + hashstring;
    };


    it('.toString', function () {
        expect(hashbang.toString()).toEqual('');
        buildURL(ha);
        expect(hashbang.toString()).toEqual(ha);
    });

    it('.parse', function () {
        expect(hashbang.parse()).toEqual({
            path: '/a/b/c/',
            query: {
                x: '1',
                y: '2',
                z: '3'
            }
        });
    });

    it('.get', function () {
        expect(hashbang.getPath()).toEqual('/a/b/c/');
        expect(hashbang.getQuery()).toEqual({
            x: '1',
            y: '2',
            z: '3'
        });
    });

    it('.getPath', function () {
        expect(hashbang.getPath()).toEqual('/a/b/c/');
    });

    it('.getQuery', function () {
        expect(hashbang.getQuery('x')).toEqual('1');
        expect(hashbang.getQuery('y')).toEqual('2');
        expect(hashbang.getQuery('z')).toEqual('3');
    });

    it('.setPath', function () {
        expect(hashbang.setPath('/o/p/q/')).toEqual('#!/o/p/q/?x=1&y=2&z=3');
    });

    it('.setQuery', function () {
        var ret = hashbang.setQuery('x', [4, 5]);

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
