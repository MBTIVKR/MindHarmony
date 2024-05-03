import { Accordion, Anchor, Card, Container, Flex, Text, Title } from "@mantine/core";
import { backlogData } from "./backlogData";
import classes from "./Backlog.module.scss";

const Backlog = () => {
  const items = backlogData.map((item) => (
    <Flex direction="column">
      <Accordion.Item key={item.value} value={item.value}>
        <Accordion.Control>{item.value}</Accordion.Control>
        <Accordion.Panel>{item.description}</Accordion.Panel>
      </Accordion.Item>
    </Flex>
  ));
  return (
    <Container mb={{ sm: 80, base: 160 }}>
      <Card withBorder radius="md" className={classes.card} mt={20}>
        <Flex justify="space-between" pb={10}>
          <Text className={classes.title} fw={800} mb={10} tt={'uppercase'}>
            Бэклог
          </Text>
        </Flex>
        <Accordion defaultValue="Apples" classNames={classes}>
          {items}
        </Accordion>
      </Card>
    </Container>
  );
};

export default Backlog;
