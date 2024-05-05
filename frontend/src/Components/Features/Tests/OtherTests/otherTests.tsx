import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme, rem } from "@mantine/core";
import { TestsCardsSlider } from "./TestsCardsSlider";
import { data } from "../../CardsCarousel/Card/cardsdata";

interface OtherTestsSliderProps {
  excludeTest: string;
}

export const OtherTestsSlider = ({ excludeTest }: OtherTestsSliderProps) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  //? Фильтруем тесты, исключая тот, который передан в пропсе excludeTest
  const filteredData = data.filter((item) => item.title !== excludeTest);

  //? Создаем слайды для карусели, исключая тест с заданным названием
  const slides = filteredData.map((item) => (
    <Carousel.Slide key={item.title}>
      <TestsCardsSlider {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      controlsOffset={"lg"}
      slideSize={{ base: "100%", sm: "50%" }}
      slideGap={{ base: rem(2), sm: "xl" }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
};
