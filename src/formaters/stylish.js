function stylish(arr, depth = 1) {
  const spaces = ' '.repeat(depth * 4 - 2);
  const spacesEnds = ' '.repeat(depth * 4 - 4);
  const result = arr.map((obj) => {
    if (obj.status === 'added') {
      return `${spaces}+ ${obj.keyName}: ${obj.value instanceof Object ? stylish([obj.value], depth + 1) : obj.value}`;
    }
    if (obj.status === 'removed') {
      return `${spaces}- ${obj.keyName}: ${obj.value instanceof Object ? stylish([obj.value], depth + 1) : obj.value}`;
    }
    if (obj.status === 'not changed') {
      return `${spaces}  ${obj.keyName}: ${obj.value instanceof Object ? stylish([obj.value], depth + 1) : obj.value}`;
    }
    if (obj.status === 'changed') {
      return `${spaces}- ${obj.keyName}: ${obj.oldValue instanceof Object ? stylish([obj.oldValue], depth + 1) : obj.oldValue}
${spaces}+ ${obj.keyName}: ${obj.newValue instanceof Object ? stylish([obj.newValue], depth + 1) : obj.newValue}`;
    }
    if (obj.status === 'nested') {
      return `${spaces}  ${obj.keyName}: ${stylish(obj.children, depth + 1)}`;
    }
    if (obj.status === undefined) {
      return Object.keys(obj).map((key) => `${spaces}  ${key}: ${obj[key] instanceof Object ? stylish([obj[key]], depth + 1) : obj[key]}`)
        .join('\n');
    }
    return '';
  })
    .join('\n');
  return `{\n${result}\n${spacesEnds}}`;
}

export default stylish;
