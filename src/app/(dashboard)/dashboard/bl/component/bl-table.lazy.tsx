'use client';
import dynamic from 'next/dynamic';
import { CenteredLoader } from '@/components/Common/centered-loader';

const Content = dynamic(() => import('./bl-table').then(mod => mod.BLTable), {
	loading: () => <CenteredLoader />,
	ssr: false,
});

export default function LazyBLTable() {
	return (
		<>
			<Content />
		</>
	);
}
