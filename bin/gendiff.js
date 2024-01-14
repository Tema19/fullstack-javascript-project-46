#!/usr/bin/env node
import { program } from 'commander';
import gendiff, { stylish } from '../src/gendiffFunc.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2> [formater]')
  .action((filepath1, filepath2, formaterOption) => {
    let formater = formaterOption;

    if (typeof formater === 'string') {
      formater = stylish;
    }

    gendiff(filepath1, filepath2, formater);
  });

program.parse();
