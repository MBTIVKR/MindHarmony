import Footer from '@/Components/Features/Layouts/Footer/Footer';
import Header from '@/Components/Features/Layouts/Header/Header';
import { Container, Space } from '@mantine/core';
import { FC } from 'react';
import {
  FAQ,
  Features,
  GetInTouch,
  Hero,
  MBTI,
} from '@Components/App/Routing';
import ReviewsCarousel from './Parts/Reviews/ReviewsCarousel';
// import styles from './Landing.module.scss';

const Landing: FC = () => {
  return (
    <>
      <Header />
      <Hero />
      {/* <Space h={70} /> */}
      <MBTI />
      {/* <Reviews /> */}
      <Container size='xl'>
        <Features />
        <FAQ />
      </Container>
      <Container>
        <ReviewsCarousel />
        <Space h={70} />
        <GetInTouch />
      </Container>
      <Footer />
    </>
  );
};

export default Landing;
