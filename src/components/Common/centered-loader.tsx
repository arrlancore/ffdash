import { Flex, Loader } from '@mantine/core';

export const CenteredLoader = () => {
	return (
		<Flex style={{ height: '50vh', alignItems: 'center', justifyContent: 'center' }}>
			<Loader />
		</Flex>
	);
};
