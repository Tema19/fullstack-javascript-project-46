function getParamValue(param) {
  if (typeof param === 'string') {
    return `'${param}'`;
  } if (typeof param === 'object' && param !== null) {
    return '[complex value]';
  }
  return param;
}

function plain(arr, path = [], depth = 0) {
  const result = arr.map((obj) => {
    if (depth < path.length) {
      // eslint-disable-next-line
      path.splice(depth, path.length);
    }
    if (obj.status === 'added') {
      const carrentPath = [...path];
      // eslint-disable-next-line
      carrentPath[depth] = obj.keyName;
      const paramValue = getParamValue(obj.value);
      return `Property '${carrentPath.join('.')}' was added with value: ${paramValue}`;
    }
    if (obj.status === 'removed') {
      const carrentPath = [...path];
      // eslint-disable-next-line
      carrentPath[depth] = obj.keyName;
      return `Property '${carrentPath.join('.')}' was removed`;
    }
    if (obj.status === 'changed') {
      const carrentPath = [...path];
      // eslint-disable-next-line
      carrentPath[depth] = obj.keyName;
      const paramOldValue = getParamValue(obj.oldValue);
      const paramNewValue = getParamValue(obj.newValue);
      return `Property '${carrentPath.join('.')}' was updated. From ${paramOldValue} to ${paramNewValue}`;
    }
    if (obj.status === 'nested') {
      const carrentPath = [...path];
      // eslint-disable-next-line
      carrentPath[depth] = obj.keyName;
      return plain(obj.children, carrentPath, depth + 1);
    }
    return null;
  })
    .filter((value) => value !== null)
    .join('\n');
  return result;
}

export default plain;
