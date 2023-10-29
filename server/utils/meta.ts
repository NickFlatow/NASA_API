//jest has a conflict with import.meta.url
//this is a workaround we can mock this object in our tests


import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);

console.log(path.dirname(__filename));
export const dirname = path.dirname(__filename);