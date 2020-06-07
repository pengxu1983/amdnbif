#!/home/benpeng/nbifweb_client/software/node/bin/node
let querystring     = require('querystring');
let http            = require('http');
let process         = require('process');
let child_process   = require('child_process');
let fs              = require('fs');
const { program }   = require('commander');
program
 .option('-t, --treeRoot <type>', 'treeRoot')
 .option('-s, --shelve <type>', 'shelve id')
 .option('-c, --codeline <type>', 'codeline')
 .option('-b, --branch_name <type>', 'branch_name')
 .option('-l, --changelist <type>', 'changelist')
 .option('-o, --vcslogdir <type>', 'vcslogdir')
 .option('-f, --isOfficial <type>', 'isOfficial')
 .option('-a, --isBAPU <type>', 'isBAPU')
 .option('-O, --out_anchor <type>', 'out_anchor')
 .option('-st, --suite <type>', 'suite')
 .option('-tp, --tasktype <type>', 'tasktype')
 .option('-VB, --UVM_VERBOSITY <type>', 'UVM_VERBOSITY')
 .option('-cfg, --config <type>', 'config')
 .option('-man, --manual', 'manual');
program.parse(process.argv);
let treeRoot    = program.treeRoot;
let shelve      = program.shelve;
let codeline    = program.codeline;
let branch_name = program.branch_name;
let vcslogdir   = program.vcslogdir;
let kickoffdate = program.kickoffdate;
let isOfficial  = program.isOfficial;
let isBAPU      = program.isBAPU;
let seed        = program.seed;
let variantname = program.variantname;
let casename    = program.casename;
let out_anchor  = program.out_anchor;
let suite       = program.suite;
let config      = program.config;
let UVM_VERBOSITY = program.UVM_VERBOSITY;
let tasktype    = program.tasktype;
let bsubQ;
