'use client';
import dynamic from 'next/dynamic';
import { CenteredLoader } from '@/components/Common/centered-loader';

const Content = dynamic(() => import('./bl-form').then(mod => mod.BLForm), {
	loading: () => <CenteredLoader />,
	ssr: false,
});

export default function BLFormLazy() {
	return (
		<>
			<Content />
		</>
	);
}
