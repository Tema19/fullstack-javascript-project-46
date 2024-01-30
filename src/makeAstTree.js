import _ from 'lodash';

const makeAstTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const unionKeys = _.union(keys1, keys2).sort();
  const treePart = unionKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { keyName: key, value: obj2[key], status: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { keyName: key, value: obj1[key], status: 'removed' };
    }
    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      return { keyName: key, children: makeAstTree(obj1[key], obj2[key]), status: 'nested' };
    }
    if (obj1[key] === obj2[key]) {
      return { keyName: key, value: obj2[key], status: 'not changed' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        keyName: key, oldValue: obj1[key], newValue: obj2[key], status: 'changed',
      };
    }
    return null;
  });
  return treePart;
};

export default makeAstTree;
