function stylish(obj, depth = 1) {
  const spaces = ' '.repeat(depth * 4 - 2);
  const spacesEnds = ' '.repeat(depth * 4 - 4);
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const result = Object.entries(obj)
    .map(([key, value]) => `${spaces}${key}: ${stylish(value, depth + 1)}`)
    .join('\n');
  return `{\n${result}\n${spacesEnds}}`;
}

export default stylish;
