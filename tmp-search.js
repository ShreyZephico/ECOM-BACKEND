const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'node_modules');
const result = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (full.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('serviceName') || content.includes('service joiner') || content.includes('service') && content.includes('joiner')) {
        result.push(full);
      }
    }
  }
}
walk(root);
console.log(result.slice(0, 40).join('\n'));
