//@ts-nocheck
import { Paper, Text, Title, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "../../CardsCarousel/Card/CardsCarousel.module.scss";

interface CardProps {
  image: string;
  title: string;
  category: string;
  url?: string | undefined;
}

export const TestsCardsSlider = ({
  image,
  title,
  category,
  url,
}: CardProps) => {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
      h="105%"
      
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Link to={url}>
        <Button variant="white" color="dark">
          Пройти
        </Button>
      </Link>
    </Paper>
  );
};
