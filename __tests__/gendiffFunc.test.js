import fs from 'fs/promises';
import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import gendiff from '../src/gendiffFunc.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');
const result = await readFile('result.txt');

test('gendiff', () => {
  gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), (_error, currentResult) => {
    expect(currentResult).toEqual(result);
  });
});
