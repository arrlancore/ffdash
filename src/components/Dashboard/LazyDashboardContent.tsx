'use client';
import dynamic from 'next/dynamic';
import { CenteredLoader } from '../Common/centered-loader';

const Content = dynamic(() => import('./DashboardContent').then(mod => mod.default), {
	loading: () => <CenteredLoader />,
	ssr: false,
});

export default function LazyDashboardContent() {
	return (
		<>
			<Content />
		</>
	);
}
