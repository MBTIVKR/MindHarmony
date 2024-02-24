import {
  CalendarLifeSection,
  EternalMemorySection,
  FamilyTreeSection,
  LineSection,
  MainSection,
  TimeCapsuleSection,
} from '@/Components';
import { Footer } from '@/Layouts';

const MainPage = () => {
  return (
    <>
      <MainSection />
      <EternalMemorySection />
      <LineSection />
      <FamilyTreeSection />
      {/* <TimeCapsuleSection /> */}
      <CalendarLifeSection />
      {/* <Footer/> */}
    </>
  );
};

export default MainPage;
