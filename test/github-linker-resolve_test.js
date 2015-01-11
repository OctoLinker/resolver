'use strict';

var resolve = require('../');
var assert = require('should');

describe('resolve', function () {

  var baseURL = 'https://github.com/user/repo/';

  it('packages', function () {

    resolve('path').should.equal('');
    resolve('lodash').should.equal('');
    resolve('unknown-package-name').should.equal('');

  });

  describe('normalize', function () {

    describe('./', function () {

      var from = baseURL + 'blob/master/index.js';

      it('./file.js', function () {
        resolve('./file.js', from).should.equal(baseURL + 'blob/master/file.js');
      });

      it('./folder/file.js', function () {
        resolve('./folder/file.js', from).should.equal(baseURL + 'blob/master/folder/file.js');
      });

      it('./file-or-folder', function () {
        resolve('./file-or-folder', from).should.equal(baseURL + 'blob/master/file-or-folder');
      });

      it('./', function () {
        resolve('./', from).should.equal(baseURL + 'blob/master');
      });
    });

    describe('../', function () {

      var from = baseURL + 'blob/master/a/index.js';

      it('../file.js', function () {
        resolve('../file.js', from).should.equal(baseURL + 'blob/master/file.js');
      });

      it('../folder/file.js', function () {
        resolve('../folder/file.js', from).should.equal(baseURL + 'blob/master/folder/file.js');
      });

      it('../file-or-folder', function () {
        resolve('../file-or-folder', from).should.equal(baseURL + 'blob/master/file-or-folder');
      });

      it('../', function () {
        resolve('../', from).should.equal(baseURL + 'blob/master');
      });

      it('..', function () {
        resolve('..', from).should.equal(baseURL + 'blob/master');
      });
    });

    describe('../../', function () {

      var from = baseURL + 'blob/master/a/b/index.js';

      it('../../file.js', function () {
        resolve('../../file.js', from).should.equal(baseURL + 'blob/master/file.js');
      });

      it('../../folder/file.js', function () {
        resolve('../../folder/file.js', from).should.equal(baseURL + 'blob/master/folder/file.js');
      });

      it('../../file-or-folder', function () {
        resolve('../../file-or-folder', from).should.equal(baseURL + 'blob/master/file-or-folder');
      });

      it('../../', function () {
        resolve('../../', from).should.equal(baseURL + 'blob/master');
      });

      it('../..', function () {
        resolve('../..', from).should.equal(baseURL + 'blob/master');
      });
    });
  });

  describe('github shorthand', function () {

    it('user/repo', function () {
      resolve('user/repo').should.equal('https://github.com/user/repo');
    });

    it('user/repo#master', function () {
      resolve('user/repo#master').should.equal('https://github.com/user/repo/tree/master');
    });
  });

  describe('github urls', function () {

    it('jquery/jquery#master', function () {
      resolve('jquery/jquery#master').should.equal('https://github.com/jquery/jquery/tree/master');
    });

    it('jquery/jquery#1.x-master', function () {
      resolve('jquery/jquery#1.x-master').should.equal('https://github.com/jquery/jquery/tree/1.x-master');
    });

    it('git+ssh://github.com:stefanbuck/github-linker-core.git', function () {
      resolve('git+ssh://github.com:stefanbuck/github-linker-core.git').should.equal('https://github.com/stefanbuck/github-linker-core');
    });

    it('git@github.com:stefanbuck/github-linker-core.git', function () {
      resolve('git@github.com:stefanbuck/github-linker-core.git').should.equal('https://github.com/stefanbuck/github-linker-core');
    });
  });

  describe('shorthand duojs', function () {

    it('user/repo@master', function () {
      resolve('user/repo@master').should.equal( baseURL + 'tree/master');
    });

    it('user/repo@dev', function () {
      resolve('user/repo@dev').should.equal( baseURL + 'tree/dev');
    });

    it('user/repo@1.2.3', function () {
      resolve('user/repo@1.2.3').should.equal( baseURL + 'tree/1.2.3');
    });

    it('user/repo@dev/master', function () {
      resolve('user/repo@dev/master').should.equal( baseURL + 'tree/dev/master');
    });

    it('user/repo@dev/master-1.2.3', function () {
      resolve('user/repo@dev/master-1.2.3').should.equal( baseURL + 'tree/dev/master-1.2.3');
    });

    it('user/repo@master:/file.js', function () {
      resolve('user/repo@master:/file.js').should.equal( baseURL + 'blob/master/file.js');
    });

    it('user/repo@master:/folder/file.js', function () {
      resolve('user/repo@master:/folder/file.js').should.equal( baseURL + 'blob/master/folder/file.js');
    });

    it('user/repo@master:/file-or-folder', function () {
      resolve('user/repo@master:/file-or-folder').should.equal( baseURL + 'blob/master/file-or-folder');
    });
  });

  describe('invalid', function () {

    it('.', function () {
      resolve('.').should.equal('');
    });

    it('...', function () {
      resolve('...').should.equal('');
    });

    it('/', function () {
      resolve('/').should.equal('');
    });

    it('@user', function () {
      resolve('@user').should.equal('');
    });

    it('/user', function () {
      resolve('/user').should.equal('');
    });
  });

});
