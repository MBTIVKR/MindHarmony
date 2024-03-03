import { FC } from 'react';
import { Container, Group, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Copyright, Paths } from '@Components/App/Routing';
import logo from '@/assets/brain.png';
import classes from './Footer.module.scss';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
];

const Footer: FC = () => {
  const items = links.map((link) => (
    <Anchor<'a'>
      c='dimmed'
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size='sm'
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Link to={Paths.Root}>
          <img src={logo} alt='logotype' width={50} />
        </Link>
        <Copyright />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
};

export default Footer;
