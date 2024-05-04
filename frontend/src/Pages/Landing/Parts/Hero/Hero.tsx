import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from '@/assets/parts/hero/hero.svg';
import classes from './Hero.module.scss';
import { APP } from '@/Share/Variables';
import { Link } from 'react-router-dom';
import { PathsDashboard } from '@/Components/App/Routing';

export const Hero = () => {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            {/* Mind <span className={classes.highlight}>Harmony</span> */}
            {APP.FULLNAME}
          </Title>
          <Text c="dimmed" mt="md">
            Сервис для сбора данных о когнитивных функциях вашей команды
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Повышение продуктивности</b> – при грамотном применении сервиса продуктивность вашей команды улучшится
            </List.Item>
            <List.Item>
              <b>Интеграционная</b> – легко внедряется в организации
            </List.Item>
            <List.Item>
              <b>Эмпатия</b> – прокачайте свою эмпатию на коллективном уровне
            </List.Item>
          </List>

          <Group mt={30}>
            <Link to={PathsDashboard.Main}>
            <Button radius="xl" size="md" className={classes.control}>
              Начать
            </Button>
            </Link>
            <Link to={APP.SOCIAL_MEDIA.GITHUB} target='blank'>
            <Button variant="default" radius="xl" size="md" className={classes.control}>
              Исходный код
            </Button>
            </Link>
          </Group>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
  );
}

export default Hero;