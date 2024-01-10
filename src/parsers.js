// import fs from 'fs';
// import path from 'path';
// import yaml from 'js-yaml';


// const readJsonYmlFile = (filepath, cb) => {
//     if (path.extname(filepath) === '.json' ){ 
//         fs.readFile(path.resolve(filepath), 'utf-8', (err, data) => {
//             if (err) {
//               Error(err);
//               return;
//             }
//             cb(err, JSON.parse(data));
//           });
//     }
//     if (path.extname(filepath) === '.yml' || path.extname(filepath) === '.yaml'  ){
//         fs.readFile(path.resolve(filepath), 'utf-8', (err, data) => {
//             if (err) {
//               Error(err);
//               return;
//             }
//             cb(err, JSON.parse(data));
//           });
//     }
// };


// const readJsonYmlFile = (filepath, cb) => {

//     fs.readFile(path.resolve(filepath), 'utf-8', (err, data) => {
//         let result = ""; 
//         if (err) {
//           Error(err);
//           return;
//         }
//         if (path.extname(filepath) === '.json' ){ 
//             result = JSON.parse(data); 
//         }
//         if (path.extname(filepath) === '.yml' || path.extname(filepath) === '.yaml'  ){
//             result = yaml.safeLoad(data);
//         }
//         cb(err, result);
//       });   
// };



import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const readJsonYmlFile = (filepath) => {
    if (!fs.existsSync(filepath)) {
        throw new Error(`File '${filepath}' does not exist`);
      } 
           
try {
  const fileContents = fs.readFileSync(path.resolve(filepath), 'utf8');
  
    if (path.extname(filepath) === '.json' ){ 
        //console.log(JSON.parse(fileContents))
        return JSON.parse(fileContents); 
    }
    if (path.extname(filepath) === '.yml' || path.extname(filepath) === '.yaml'  ){
        //console.log(yaml.load(fileContents))
        return yaml.load(fileContents);
            }
} catch (err) {
  console.error('Error reading file:', err);
}
}
export default readJsonYmlFile; 
//readJsonYmlFile("/mnt/c/Users/artem/OneDrive/Desktop/fullstack-javascript-project-46/__fixtures__/file3.yml"); 