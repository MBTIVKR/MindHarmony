import Footer from '@/Components/Features/Layouts/Footer/Footer';
import Header from '@/Components/Features/Layouts/Header/Header';
import { Container } from '@mantine/core';
import { FC } from 'react';
import {
  FAQ,
  Features,
  GetInTouch,
  Hero,
  MBTI,
  Reviews,
} from '@Components/App/Routing';
import styles from './Landing.module.scss';

const Landing: FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <MBTI />
      {/* <Reviews /> */}
      <Container size='xl'>
        {/* <Text className={styles.mb}>Lol</Text> */}
        <Features />
        <FAQ />
      </Container>
      <Container>
        <GetInTouch />
      </Container>
      <Footer />
    </>
  );
};

export default Landing;
