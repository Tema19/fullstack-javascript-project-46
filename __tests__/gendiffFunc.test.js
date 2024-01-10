import fs from 'fs/promises';
import path, { dirname } from 'path';

import { fileURLToPath } from 'url';
import gendiff from '../src/gendiffFunc.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');
const result1 = await readFile('result1.txt');
const result2 = await readFile('result2.txt');
const result3 = await readFile('result3.txt');


describe('Json file tests', () => {
  describe('comapareTwoJsonFiles', () => {
    test('gendiff with two partially different Json Files', () => {
      gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), (_error, currentResult) => {
        expect(currentResult).toEqual(result1);
      });
    });
  });

  describe('comapare two equal Json files', () => {
    test('gendiff between two equal Json files', () => {
      gendiff(getFixturePath('file1.json'), getFixturePath('file1.json'), (_error, currentResult) => {
        expect(currentResult).toEqual(result2);
      });
    });
  });

  describe('comapare Json file with Empty Json', () => {
    test('gendiff between two equal Json files', () => {
      gendiff(getFixturePath('file1.json'), getFixturePath('emptyJson.json'), (_error, currentResult) => {
        expect(currentResult).toEqual(result3);
      });
    });
  });

  describe('comapare Json file with Non existing file', () => {
    test('gendiff between Json and non existing file', () => {
        expect(() => {
          gendiff(getFixturePath('file1.json'), getFixturePath('NonexistingFile.json'));
        }).toThrow(Error)
      });
    });
  });

describe('Yml file tests', () => {
  describe('comapareTwoYmlFiles', () => {
    test('gendiff with two partially different Json Files', () => {
      gendiff(getFixturePath('file5.yml'), getFixturePath('file3.yml'), (_error, currentResult) => {
        expect(currentResult).toEqual(result1);
      });
    });
  });

  describe('comapare files with yml and yaml', () => {
    test('gendiff between two equal Json files', () => {
      gendiff(getFixturePath('file5.yml'), getFixturePath('file4.yaml'), (_error, currentResult) => {
        expect(currentResult).toEqual(result2);
      });
    });
  });

  describe('comapare yml file with Empty Json', () => {
    test('gendiff between two equal Json files', () => {
      gendiff(getFixturePath('file5.yml'), getFixturePath('emptyJson.json'), (_error, currentResult) => {
        expect(currentResult).toEqual(result3);
      });
    });
  });
});
