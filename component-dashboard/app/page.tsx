import { Button, Text, Flex } from '@radix-ui/themes';

export default function Home() {
  return (
    <Flex direction="column" gap="2" align="center" justify="center" style={{ height: '100vh' }}>
      <Text size="8" weight="bold">Welcome to Radix UI Themes Dashboard!</Text>
      <Button size="3">Get Started</Button>
    </Flex>
  );
}