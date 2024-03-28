import { ActionIcon, Popover, Text } from '@mantine/core';
import { IconEyeCheck } from '@tabler/icons-react';
import DataView from './data-view';

export function PreviewAction(props: { data: Record<string, any> }) {
	return (
		<Popover position="bottom" withArrow shadow="md">
			<Popover.Target>
				<ActionIcon aria-label="Preview">
					<IconEyeCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
				</ActionIcon>
			</Popover.Target>
			<Popover.Dropdown>
				<DataView data={props.data} />
			</Popover.Dropdown>
		</Popover>
	);
}
