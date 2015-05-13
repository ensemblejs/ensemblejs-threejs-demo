'use strict';

var entryPoint = require('ensemblejs-client');
entryPoint.loadWindow(require('window'));
entryPoint.loadDefaults();
entryPoint.load(require('./views/bouncing-ball'));
entryPoint.load(require('./logic/ball-behaviour'));
entryPoint.run();