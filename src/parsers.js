import yaml from 'js-yaml';

function parsers(data, ext) {
  switch (ext) {
    case '.json': return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default: throw new Error(`Invalid extension - ${ext}`);
  }
}
export default parsers;
