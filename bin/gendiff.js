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
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'Output format: default stylish')
  .action((filepath1, filepath2, options) => {
    const type = options.format || 'stylish';
    let formatter;
    switch (type) {
      case 'plain':
        formatter = plain;
        break;
      case 'json':
        formatter = json;
        break;
      case 'stylish':
      default:
        formatter = stylish;
    }

    gendiff(filepath1, filepath2, formatter);
  });

program.parse();
