#!/usr/bin/env node
'use strict';
const program = require('commander');

program
    .version('0.0.1')
    .command('create','Launch krojs app creation in current directory')
    .parse(process.argv);

