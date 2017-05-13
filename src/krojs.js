#!/usr/bin/env node

const program = require('commander');

program
    .version('0.0.1')
    .command('create [name]','Launch krojs creation in current directory').alias('c')
    .parse(process.argv);

