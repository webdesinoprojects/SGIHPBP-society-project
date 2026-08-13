const fs = require('fs');
const path = require('path');

const srcDir = path.join('c:', 'Users', 'asnoi', 'Downloads', 'SGIHPBP-society-project', 'frontend', 'src');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.match(/\.(jsx|js|ts|tsx)$/)) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace all variations
  content = content.replace(/DC-IAPM/gi, "SGIHPBP");
  content = content.replace(/DC_IAPM/gi, "SGIHPBP");
  content = content.replace(/DCIAPM/gi, "SGIHPBP");
  content = content.replace(/DELHI CH OF IAPM/gi, "SGIHPBP");
  content = content.replace(/Delhi Chapter of Indian Association of Pathologists and Microbiologists/gi, "SGIHPBP");
  content = content.replace(/Delhi Chapter/gi, "SGIHPBP");
  content = content.replace(/Indian Association of Pathologists/gi, "SGIHPBP");

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
