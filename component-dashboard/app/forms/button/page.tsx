import { promises as fs } from 'fs';
import path from 'path';
import MDXContent from './MDXContent';

export default async function ButtonPage() {
  // MDX 파일 경로
  const mdxPath = path.join(process.cwd(), 'data', 'forms', 'button.mdx');
  
  try {
    // MDX 파일 읽기 (서버 측에서만 실행됨)
    const source = await fs.readFile(mdxPath, 'utf8');
    
    return (
      <div className="prose max-w-4xl mx-auto p-6">
        <MDXContent source={source} />
      </div>
    );
  } catch (error) {
    console.error('Error loading MDX file:', error);
    return <div>Error loading button documentation</div>;
  }
}
