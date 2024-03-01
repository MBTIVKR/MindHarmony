import Footer from '@/Components/Features/Layouts/Footer/Footer';
import Header from '@/Components/Features/Layouts/Header/Header';
import { Text } from '@mantine/core';
import { FC } from 'react';
import styles from './Landing.module.scss'

const Landing: FC = () => {
  return (
    <>
      <Header />
			<Text className={styles.mb}>Lol</Text>
      <Footer />
    </>
  );
};

export default Landing;
