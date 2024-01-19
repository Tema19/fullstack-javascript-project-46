#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../src/gendiff.js';
import stylish from '../src/formaters/stylish.js';
import plain from '../src/formaters/plain.js';
import json from '../src/formaters/json.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2> [formater]')
  .action((filepath1, filepath2, formaterOption = 'stylish') => {
    let formater = formaterOption;

    switch (formaterOption) {
      case 'stylish':
        formater = stylish;
        break;
      case 'plain':
        formater = plain;
        break;
      case 'json':
        formater = json;
        break;
      default:
        formater = stylish;
        break;
    }

    gendiff(filepath1, filepath2, formater);
  });

program.parse();
