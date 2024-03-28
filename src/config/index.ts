import { IconComponents, IconDashboard, IconLock, IconMoodSmile } from '@tabler/icons-react';
import { NavItem } from '@/types/nav-item';

export const navLinks: NavItem[] = [
	{ label: 'Dashboard', icon: IconDashboard, link: '/dashboard' },

	{
		label: 'Shipments',
		icon: IconComponents,
		initiallyOpened: true,
		links: [
			{
				label: 'BL',
				link: '/dashboard/bl',
			},
			{
				label: 'Form',
				link: '/dashboard/form',
			},
		],
	},
	{
		label: 'Auth',
		icon: IconLock,
		initiallyOpened: true,
		links: [
			{
				label: 'Login',
				link: '/login',
			},
			{
				label: 'Register',
				link: '/register',
			},
		],
	},
	{
		label: 'Sample',
		icon: IconMoodSmile,
		initiallyOpened: true,
		links: [
			{
				label: 'Landing',
				link: '/',
			},
		],
	},
];
