import { ActionsGrid, TestsPassed } from "@/Components/App/Routing";
import { CardsCarousel } from "@/Components/Features/CardsCarousel/CardsCarousel";
import { FC } from "react";

const AppHome: FC = () => {
  return (
    <div style={{ padding: "40px 0" }}>
      {/* <Title pt={20} pb={20}>
        Главная страница
      </Title> */}

      <CardsCarousel />
      <TestsPassed />
      <ActionsGrid />
    </div>
  );
};

export default AppHome;
