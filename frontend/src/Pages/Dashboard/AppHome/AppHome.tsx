import { ActionsGrid, TestsPassed } from "@/Components/App/Routing";
import { CardsCarousel } from "@/Components/Features/CardsCarousel/CardsCarousel";
import { FC } from "react";

const AppHome: FC = () => {
  return (
    <div style={{ padding: "40px 0" }}>
      <CardsCarousel />
      <TestsPassed />
      <ActionsGrid />
    </div>
  );
};

export default AppHome;
