import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MdxContent } from '@/components/MdxContent'; // MdxContent 임포트
import { Heading, Box, Text } from '@radix-ui/themes'; // Radix UI 컴포넌트 임포트

interface Frontmatter {
  title: string;
  description: string;
  category: string;
  status: string;
}

interface ComponentPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), 'data');
  const categories = await fs.readdir(dataDir);

  let paths: { category: string; slug: string }[] = [];

  for (const category of categories) {
    const categoryPath = path.join(dataDir, category);
    const files = await fs.readdir(categoryPath);

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '');
        paths.push({ category, slug });
      }
    }
  }
  return paths;
}

async function getMdxContent(category: string, slug: string) {
  const filePath = path.join(process.cwd(), 'data', category, `${slug}.mdx`);
  const fileContent = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  return { data: data as Frontmatter, content };
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { category, slug } = params;
  const { data, content } = await getMdxContent(category, slug);

  return (
    <Box p="5">
      <Heading size="7" mb="2">{data.title}</Heading>
      <Text size="3" color="gray" mb="5">{data.description}</Text>
      <MdxContent source={content} />
    </Box>
  );
}
