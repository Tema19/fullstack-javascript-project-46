import fs from 'fs/promises';
import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';
import stylish from '../src/formaters/stylish.js';
import plain from '../src/formaters/plain.js';
import json from '../src/formaters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');
const extensions = ['yml', 'json'];

describe('function highlight differences', () => {
  test.each(extensions)('compare file1 and file2 to equal to result', async (ext) => {
    const file1 = getFixturePath(`file1.${ext}`);
    const file2 = getFixturePath(`file2.${ext}`);
    const result1 = await readFile('result1.txt');
    const result2 = await readFile('result2.txt');
    const result3 = await readFile('result3.json');

    expect(gendiff(file1, file2, stylish)).toBe(result1);
    expect(gendiff(file1, file2, plain)).toBe(result2);
    expect(gendiff(file1, file2, json)).toBe(result3);
    expect(gendiff(file1, file2)).toBe(result1);
  });
});
