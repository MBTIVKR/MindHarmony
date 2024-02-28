import { Theme } from '@/Components/Features';
import { Burger, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome2 } from '@tabler/icons-react';

export const Header = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <header className='header'>
      <Burger
        // size='md'
        opened={opened}
        onClick={toggle}
        aria-label='Toggle navigation'
      />
      <nav className="nav-menu">
      <NavLink
        href="#required-for-focus"
        label="With icon"
        // leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        href="#required-for-focus"
        label="With icon"
        // leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        href="#required-for-focus"
        label="With icon"
        // leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        href="#required-for-focus"
        label="With icon"
        // leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      </nav>
      <Theme />
    </header>
  );
};
