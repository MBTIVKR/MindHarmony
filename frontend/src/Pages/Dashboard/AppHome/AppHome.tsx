import {
  ActionsGrid,
  Backlog,
  Footer,
  TestsPassed,
} from "@/Components/App/Routing";
import { OtherTestsSlider } from "@/Components/Features/Tests/OtherTests/otherTests";
import { FC } from "react";

const AppHome: FC = () => {
  return (
    <div style={{ padding: "40px 0" }}>
      <OtherTestsSlider />
      <TestsPassed />
      <ActionsGrid />
      <Backlog />
      <Footer />
    </div>
  );
};

export default AppHome;
