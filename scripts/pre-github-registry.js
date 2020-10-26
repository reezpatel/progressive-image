const fs = require('fs');
const content = require('../package.json');

content.name = '@reezpatel/progressive-image';
content.publishConfig = {
  registry: 'https://npm.pkg.github.com',
};

fs.writeFileSync('package.json', JSON.stringify(content, null, 2));
