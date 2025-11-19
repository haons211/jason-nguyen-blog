const { getAllPosts } = require('./src/lib/mdx/index.ts');

async function checkSort() {
  try {
    // We need to mock fs and path if we run this directly with node, 
    // but since we are in the environment, we might be able to run it if we compile it or use ts-node.
    // However, simpler is to just read the files manually in the script to be independent of the app build.
    
    const fs = require('fs');
    const path = require('path');
    const matter = require('gray-matter');

    const postsDir = path.join(process.cwd(), 'src/content/posts');
    const files = fs.readdirSync(postsDir);
    
    const posts = files
      .filter(f => f.endsWith('.mdx'))
      .map(f => {
        const content = fs.readFileSync(path.join(postsDir, f), 'utf8');
        const { data } = matter(content);
        return { file: f, date: data.date };
      });

    console.log('Original dates:');
    posts.forEach(p => console.log(`${p.date} - ${p.file}`));

    posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    console.log('\nSorted dates (Newest first):');
    posts.forEach(p => console.log(`${p.date} - ${p.file}`));
    
  } catch (e) {
    console.error(e);
  }
}

checkSort();
