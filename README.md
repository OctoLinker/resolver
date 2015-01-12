# resolver 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

Little module that helps with link resolving.

## Install

```bash
$ npm install --save github-linker-resolver
```


## API

Resolve a url into a GitHub url

```javascript
var resolver = require('github-linker-resolverr');

resolver('user/repo'); 
// https://github.com/user/repo

resolver('user/repo#master'); 
// https://github.com/user/repo/tree/master

resolver('../../index.js', 'https://github.com/user/repo/blob/master/lib/utils/math.js'); 
// https://github.com/user/repo/blob/master/index.js

resolver('user/repo@master'); 
// https://github.com/user/tree/master

resolver('user/repo@master:/folder/file.js');
// https://github.com/user/repo/blob/master/folder/file.js
```




## License

Copyright (c) 2015 by the GitHub-Linkter authors. Licensed under the MIT license.



[npm-url]: https://npmjs.org/package/github-linker-resolver
[npm-image]: https://badge.fury.io/js/github-linker-resolver.svg
[travis-url]: https://travis-ci.org/github-linker/resolver
[travis-image]: https://travis-ci.org/github-linker/resolver.svg?branch=master
[daviddm-url]: https://david-dm.org/github-linker/resolver.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/github-linker/resolver
[coveralls-url]: https://coveralls.io/r/github-linker/resolver
[coveralls-image]: https://coveralls.io/repos/github-linker/resolver/badge.png
