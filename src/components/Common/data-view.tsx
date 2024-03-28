import { SimpleGrid, Text } from '@mantine/core';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type DataType = {
	[key: string]: string | number | boolean | Date;
};

const Utils = {
	formatDate: (date: Date | string) => {
		if (typeof date === 'string') {
			date = new Date(date);
		}
		return dayjs(date).format('DD/MM/YYYY');
	},
	formatValue: (value: any) => {
		if (typeof value === 'boolean') {
			return value ? 'Yes' : 'No';
		}

		// Check if value is an image url
		const imageUrlPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
		if (imageUrlPattern.test(value)) {
			return (
				<Image
					onClick={() => window.open(value, '_blank')}
					src={value}
					alt="image"
					width={50}
					height={50}
					className="mt-2 block"
				/>
			);
		}

		// Check if value is a link
		const linkUrlPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:pdf|docx)/g;
		if (linkUrlPattern.test(value)) {
			return (
				<Link href={value} target="_blank">
					Open
				</Link>
			);
		}

		if (typeof value === 'string') {
			const isoDatePattern = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z|\d{4}-\d{2}-\d{2})$/;

			if (isoDatePattern.test(value)) {
				return Utils.formatDate(new Date(value));
			}
		}

		// Check if value is a date
		if (value instanceof Date) {
			return Utils.formatDate(value);
		}

		// Check if value is a number or string
		return typeof value === 'string' || typeof value === 'number' ? value : '-';
	},
};

const defaultSkips = ['__v', '_id'];

interface DataViewProps {
	data: unknown;
	skips?: string[];
	customLabels?: { [key: string]: string };
	customFormatValue?: { [key: string]: (v: any) => string | JSX.Element };
}

const DataView: React.FC<DataViewProps> = ({ data, skips, customLabels, customFormatValue }) => {
	const fieldsToSkip = defaultSkips.concat(skips ?? []);

	return (
		<SimpleGrid pb={20} cols={{ base: 1, sm: 2, lg: 3 }}>
			{Object.keys(data as DataType)
				.filter(key => !fieldsToSkip.includes(key))
				.map(key => {
					const value = (data as DataType)[key];
					return (
						<div key={key}>
							<Text size="sm">
								{customLabels && key in customLabels
									? customLabels[key]
									: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
							</Text>
							<Text c="dimmed">
								{customFormatValue && key in customFormatValue
									? customFormatValue[key](value)
									: Utils.formatValue(value)}
							</Text>
						</div>
					);
				})}
		</SimpleGrid>
	);
};

export default DataView;
