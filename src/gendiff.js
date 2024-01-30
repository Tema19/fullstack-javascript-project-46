import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import makeAstTree from './makeAstTree.js';

const gendiff = (filepath1, filepath2, formater) => {
  const absoluteFilepath1 = path.resolve(process.cwd(), filepath1);
  const absoluteFilepath2 = path.resolve(process.cwd(), filepath2);

  const file1Ext = path.extname(absoluteFilepath1);
  const file2Ext = path.extname(absoluteFilepath2);

  const filedata1 = fs.readFileSync(absoluteFilepath1, 'utf-8');
  const filedata2 = fs.readFileSync(absoluteFilepath2, 'utf-8');

  const data1 = parsers(filedata1, file1Ext);
  const data2 = parsers(filedata2, file2Ext);
  const astTree = makeAstTree(data1, data2);
  const result = formater(astTree);
  return result;
};

export default gendiff;
