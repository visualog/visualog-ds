import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getComponentPaths() {
  const dataDir = path.join(process.cwd(), 'data');
  const categories = await fs.readdir(dataDir);

  let paths: { category: string; slug: string; title: string }[] = [];

  for (const category of categories) {
    const categoryPath = path.join(dataDir, category);
    const files = await fs.readdir(categoryPath);

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '');
        const filePath = path.join(categoryPath, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContent);
        paths.push({ category, slug, title: data.title || slug });
      }
    }
  }
  return paths;
}
