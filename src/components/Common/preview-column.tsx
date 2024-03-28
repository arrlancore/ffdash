import { Text } from '@mantine/core';
import React from 'react';
import { PreviewAction } from './preview-action';

const PreviewColumnView = (props: { data: Record<string, any>; titleKey: string }) => {
	return (
		<Text
			style={{
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'center',
				gap: '6px',
			}}
		>
			{props.data[props.titleKey]} <PreviewAction data={props.data} />
		</Text>
	);
};

export default PreviewColumnView;
