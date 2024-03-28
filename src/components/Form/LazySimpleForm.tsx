'use client';
import dynamic from 'next/dynamic';
import { CenteredLoader } from '../Common/centered-loader';

const Content = dynamic(() => import('./SimpleForm').then(mod => mod.SimpleForm), {
	loading: () => <CenteredLoader />,
	ssr: false,
});

export default function LazySimpleForm() {
	return (
		<>
			<Content />
		</>
	);
}
