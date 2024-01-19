function objectIteration(object, path = []) {
  let result = {};
  Object.keys(object).forEach((key) => {
    const currentKey = [...path, key.slice(2)];
    if (typeof object[key] === 'object' && key.slice(0, 2) === '  ') {
      result = { ...result, ...objectIteration(object[key], currentKey) };
    }
    if (typeof object[key] === 'object' && object[key] !== null && key.slice(0, 2) !== '  ') {
      result[currentKey] = { Value: '[complex value]', Status: key.slice(0, 2) };
    } else {
      if ((Object.prototype.hasOwnProperty.call(result, currentKey)) && result[currentKey].Status === '- ') {
        result[currentKey]['Old value'] = result[currentKey].Value;
        delete result[currentKey].Value;
        result[currentKey] = {
          ...result[currentKey],
          ...{
            'New value': typeof object[key] === 'string' ? `'${object[key]}'` : object[key],
            Status: 'changed',
          },
        };
      }
      if ((Object.prototype.hasOwnProperty.call(result, currentKey)) && result[currentKey].Status === '+ ') {
        result[currentKey]['New value'] = result[currentKey].Value;
        delete result[currentKey].Value;
        result[currentKey] = {
          ...result[currentKey],
          ...{
            'Old value': typeof object[key] === 'string' ? `'${object[key]}'` : object[key],
            Status: 'changed',
          },
        };
      }
      if (!(Object.prototype.hasOwnProperty.call(result, currentKey))) {
        result[currentKey] = { Value: typeof object[key] === 'string' ? `'${object[key]}'` : object[key], Status: key.slice(0, 2) };
      }
    }
  });
  return result;
}

function plain(object) {
  const result = [];
  const obj = objectIteration(object);
  Object.keys(obj).forEach((key) => {
    if (obj[key].Status === '+ ') {
      result.push(`Property '${key.replace(/,/g, '.')}' was added with value: ${obj[key].Value}`);
    }
    if (obj[key].Status === '- ') {
      result.push(`Property '${key.replace(/,/g, '.')}' was removed`);
    }
    if (obj[key].Status === 'changed') {
      result.push(`Property '${key.replace(/,/g, '.')}' was updated. From ${obj[key]['Old value']} to ${obj[key]['New value']}`);
    }
  });
  return result.join('\n');
}

export default plain;
