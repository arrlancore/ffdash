'use client';
import dynamic from 'next/dynamic';
import { CenteredLoader } from '@/components/Common/centered-loader';

const Content = dynamic(() => import('./bl-view').then(mod => mod.default), {
	loading: () => <CenteredLoader />,
	ssr: false,
});

export default function BLViewLazy() {
	return (
		<>
			<Content />
		</>
	);
}
