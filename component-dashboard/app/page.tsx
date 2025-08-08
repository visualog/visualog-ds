import { Box, Heading, Text, Flex } from '@radix-ui/themes';

export default function Home() {
  return (
    <Box p="4">
      <Heading size="7" mb="4">Welcome to Radix UI Themes Component Dashboard!</Heading>
      <Text as="p" mb="3">
        이 대시보드는 Radix UI Themes 컴포넌트들을 탐색하고 이해하는 데 도움을 주기 위해 제작되었습니다.
      </Text>
      <Text as="p" mb="3">
        좌측 사이드바에서 원하는 컴포넌트 카테고리를 선택하거나, 특정 컴포넌트를 검색하여 상세 정보를 확인하세요.
      </Text>
      <Flex direction="column" gap="2" mt="5">
        <Heading size="4">주요 기능:</Heading>
        <ul>
          <li><Text>컴포넌트 카테고리별 분류</Text></li>
          <li><Text>상세 설명 및 사용 예시</Text></li>
          <li><Text>코드 스니펫 (Syntax Highlighting)</Text></li>
          <li><Text>Do / Don't 가이드</Text></li>
          <li><Text>Props 테이블</Text></li>
        </ul>
      </Flex>
    </Box>
  );
}
