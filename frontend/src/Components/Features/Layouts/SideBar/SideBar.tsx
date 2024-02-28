import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './SideBar.module.scss';
import { Paths } from '@/Components/App/Routing';
import { Link } from 'react-router-dom';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  href: string;
  active?: boolean;
  onClick?(): void;
}

export function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  href,
}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position='right' transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Link to={href} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </Link>
      </UnstyledButton>
    </Tooltip>
  );
}

const BarItems = [
  { icon: IconHome2, label: 'Home', href: Paths.Home },
  { icon: IconGauge, label: 'Dashboard', href: Paths.Test },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics', href: Paths.Test },
  { icon: IconCalendarStats, label: 'Releases', href: Paths.Test },
  { icon: IconUser, label: 'Account', href: Paths.Account },
  { icon: IconFingerprint, label: 'Security', href: Paths.Test },
  { icon: IconSettings, label: 'Settings', href: Paths.Settings },
];

export const NavbarMinimal = () => {
  const [active, setActive] = useState(0);

  const links = BarItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <Link to={Paths.Root}>
          <MantineLogo type='mark' size={30} />
        </Link>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify='center' gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify='center' gap={0}>
        <NavbarLink icon={IconLogout} label='Logout' href={Paths.Logout} />
      </Stack>
    </nav>
  );
};
