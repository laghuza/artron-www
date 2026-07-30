import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';
const OUTPUT_FILE = './project_source_export.md';

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = getFiles(SRC_DIR).filter(f => !f.endsWith('.ico'));

let markdown = `# Project Source Code Export\n\n`;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const ext = path.extname(file).replace('.', '');
  const lang = ext === 'tsx' || ext === 'ts' ? 'typescript' : ext;
  
  markdown += `## File: \`${file}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`;
}

fs.writeFileSync(OUTPUT_FILE, markdown);
console.log(`Successfully exported to ${OUTPUT_FILE}`);
