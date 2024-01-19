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
const result1 = await readFile('result1.txt');
const result2 = await readFile('result2.txt');
const result3 = await readFile('result3.txt');
const result4 = await readFile('result4.txt');
const result5 = await readFile('result5.txt');
const result6 = await readFile('result6.json');

describe('Json file tests', () => {
  describe('comapareTwoJsonFiles', () => {
    test('gendiff with two partially different Json Files', () => {
      expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), stylish)).toEqual(result1);
    });
  });

  describe('comapare two equal Json files', () => {
    test('gendiff between two equal Json files', () => {
      expect(gendiff(getFixturePath('file1.json'), getFixturePath('file1.json'), stylish)).toEqual(result2);
    });
  });

  describe('comapare Json file with Empty Json', () => {
    test('gendiff between two equal Json files', () => {
      expect(gendiff(getFixturePath('file1.json'), getFixturePath('emptyJson.json'), stylish)).toEqual(result3);
    });
  });

  describe('comapare Json file with Non existing file', () => {
    test('gendiff between Json and non existing file', () => {
      expect(() => {
        gendiff(getFixturePath('file1.json'), getFixturePath('NonexistingFile.json'), stylish);
      }).toThrow(Error);
    });
  });
});

describe('Yml file tests', () => {
  describe('comapareTwoYmlFiles', () => {
    test('gendiff with two partially different Json Files', () => {
      expect(gendiff(getFixturePath('file3.yml'), getFixturePath('file5.yml'), stylish)).toEqual(result1);
    });
  });

  describe('comapare files with yml and yaml', () => {
    test('gendiff between two equal Json files', () => {
      expect(gendiff(getFixturePath('file4.yaml'), getFixturePath('file5.yml'), stylish)).toEqual(result1);
    });
  });

  describe('comapare yml file with Empty Json', () => {
    test('gendiff between two equal Json files', () => {
      expect(gendiff(getFixturePath('file4.yaml'), getFixturePath('emptyJson.json'), stylish)).toEqual(result3);
    });
  });

  describe('comapare Json files with nested objects', () => {
    test('gendiff between two different Json files', () => {
      expect(gendiff(getFixturePath('file7.json'), getFixturePath('file8.json'), stylish)).toEqual(result4);
    });
  });

  describe('comapare Yml files with nested objects', () => {
    test('gendiff between two different Yml files', () => {
      expect(gendiff(getFixturePath('file9.yml'), getFixturePath('file10.yml'), stylish)).toEqual(result4);
    });
  });

  describe('comapare Yml files with nested objects', () => {
    test('gendiff between two different Yml files with plain formater', () => {
      expect(gendiff(getFixturePath('file9.yml'), getFixturePath('file10.yml'), plain)).toEqual(result5);
    });
  });

  describe('comapare Yml files with nested objects', () => {
    test('gendiff between two different Yml files with json formater', () => {
      expect(gendiff(getFixturePath('file9.yml'), getFixturePath('file10.yml'), json)).toEqual(result6);
    });
  });
});
