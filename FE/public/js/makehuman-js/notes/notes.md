- [ ] make it a webpack module like kerasjs
- [ ] make data in a seperate package
    - how to provide the data, through a package that provides a path?
        - makehuman
            - looks like I'm import json/* as import... need to make it from makehuman-data...
            - what about public? it uses CopyWebpackPlugin so I need to change it from ./public to makehuman-data/public
                - but this package needs to be python, and needs to be built, hmm build on release to get json
                - download hg or from ftp, for public data
- [ ] make dual licensing for commercial and open source? with contributer agreements?
- [ ] make tests
- [ ] make it so I configure location of baseurl on init


Can I mock xhr requests https://github.com/jameslnewell/xhr-mock then make it work on node, then use travis?
Maybe not if webgl doesn't work hmm
webpack --config  webpack.test.config.js && mocha build/makehuman.test.js
