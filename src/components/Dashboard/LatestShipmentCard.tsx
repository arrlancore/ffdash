'use client';

import { Card, Title } from '@mantine/core';
import { MRT_ColumnDef, MRT_Table } from 'mantine-react-table';
import { useCustomTable } from '@/hooks/use-custom-table';
import classes from './Dashboard.module.css';

type Block = {
	blNumber: string;
	shipper: string;
	consignee: string;
	portOfLoading: string;
	shipmentDate: string;
};

const dummyBillOfLadingData: Block[] = [
	{
		blNumber: 'JKTHKG2402001',
		shipper: 'PT. CAHAYA PERDANA PLASTICS',
		consignee: 'MAN FUNG DISTRIBUTORS LTD',
		portOfLoading: 'TG. PRIOK PORT',
		shipmentDate: '2024-02-17',
	},
	{
		blNumber: 'SGDXB2403002',
		shipper: 'ACME ELECTRONICS PTE LTD',
		consignee: 'AL FUTTAIM ELECTRONICS LLC',
		portOfLoading: 'SINGAPORE',
		shipmentDate: '2024-03-05',
	},
	{
		blNumber: 'LAXSYD2402003',
		shipper: 'CALIFORNIA FRUIT EXPORTS INC.',
		consignee: 'AUSSIE FRESH PRODUCE PTY LTD',
		portOfLoading: 'LOS ANGELES',
		shipmentDate: '2024-02-22',
	},
	{
		blNumber: 'ROTTRD2403004',
		shipper: 'DUTCH MACHINERY EXPORTS B.V.',
		consignee: 'THAI INDUSTRIAL SOLUTIONS CO., LTD.',
		portOfLoading: 'ROTTERDAM',
		shipmentDate: '2024-03-10',
	},
	{
		blNumber: 'CTGDXB2402005',
		shipper: 'BANGLADESH TEXTILES LTD.',
		consignee: 'EMIRATI FASHION TRADING LLC',
		portOfLoading: 'CHITTAGONG',
		shipmentDate: '2024-02-28',
	},
];

export function LatestShipmentCard() {
	const columns: MRT_ColumnDef<Block>[] = [
		{
			accessorKey: 'blNumber',
			header: 'B/L',
		},
		{
			accessorKey: 'shipper',
			header: 'Shipper',
		},
		{
			accessorKey: 'consignee',
			header: 'Consignee',
		},
		{
			accessorKey: 'portOfLoading',
			header: 'Port of Loading',
		},
		{
			accessorKey: 'shipmentDate',
			header: 'Shipment Date',
		},
	];

	const table = useCustomTable({
		columns,
		data: dummyBillOfLadingData ?? [],
		rowCount: dummyBillOfLadingData?.length ?? 0,
		enableTopToolbar: false,
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 5,
			},
		},
	});

	return (
		<Card radius="md">
			<Card.Section className={classes.section}>
				<Title order={5}>Shipment Terakhir</Title>
			</Card.Section>
			<Card.Section className={classes.section}>
				<MRT_Table table={table} />
			</Card.Section>
		</Card>
	);
}
