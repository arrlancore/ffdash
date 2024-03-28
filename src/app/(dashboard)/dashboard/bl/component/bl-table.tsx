'use client';

import { Box, Button, Menu, Paper } from '@mantine/core';
import { IconDownload, IconSend, IconUserCircle } from '@tabler/icons-react';
import { ColumnFilter, Row } from '@tanstack/react-table';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { exportToExcel } from '@/utils/export-to-excel';
import { columnFiltersToObject } from '@/utils/to-object';
import { useBls } from '../service';
import { BillOfLading } from '../service/types';

export function BLTable() {
	const router = useRouter();
	const rowsPerPageOption = ['10', '15', '30', '100'];
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 15, //customize the default page size
	});
	const [columnFilters, setColumnFilters] = useState<Array<ColumnFilter>>([]);
	const { data, isError, isFetching, isLoading } = useBls({
		pagination: { page: pagination.pageIndex, pageSize: pagination.pageSize },
		filter: columnFiltersToObject(columnFilters),
	});

	console.log({ columnFilters: columnFiltersToObject(columnFilters) });

	const columns = useMemo<MRT_ColumnDef<BillOfLading>[]>(
		() => [
			{
				accessorKey: 'blNumber',
				header: 'B/L',
			},
			{
				accessorKey: 'shipper.name',
				header: 'Shipper',
			},
			{
				accessorKey: 'consignee.name',
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
		],
		[],
	);

	const handleExportRows = (arr: unknown) => {
		exportToExcel<BillOfLading>(
			data?.result || [],
			'Bill_of_lading_' + new Date().toLocaleString(),
			'AI1', // end of column
		);
	};

	const table = useMantineReactTable<BillOfLading>({
		columns,
		data: data?.result ?? [],
		rowCount: data?.count ?? 0,
		state: {
			isLoading,
			showAlertBanner: isError,
			showProgressBars: isFetching,
			columnFilters,
			pagination,
		},
		mantinePaginationProps: {
			rowsPerPageOptions: rowsPerPageOption,
		},
		onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
		initialState: {
			showGlobalFilter: true, //show the global filter by default
		},
		manualFiltering: true, //turn off client-side filtering
		onColumnFiltersChange: setColumnFilters, //hoist internal columnFilters state to your state
		enableRowActions: true,
		enableGlobalFilterModes: false,
		positionGlobalFilter: 'left',
		renderRowActionMenuItems: props => (
			<>
				<Menu.Item>
					<Link
						style={{ textDecoration: 'none' }}
						href={`/dashboard/bl/${props.row.getValue('blNumber')}/view`}
					>
						Lihat BL
					</Link>
				</Menu.Item>
				<Menu.Item>Lihat Invoice</Menu.Item>
				<Menu.Item>Lihat Credit Note</Menu.Item>
			</>
		),
		positionToolbarAlertBanner: 'bottom',
		renderTopToolbarCustomActions: ({ table }) => (
			<Box
				style={{
					display: 'flex',
					gap: '16px',
					padding: '8px',
					flexWrap: 'wrap',
				}}
			>
				<Button
					disabled={table.getPrePaginationRowModel().rows.length === 0}
					//export all rows, including from the next page, (still respects filtering and sorting)
					onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
					leftSection={<IconDownload />}
					variant="filled"
				>
					Export All Rows
				</Button>
				<Button
					disabled={table.getRowModel().rows.length === 0}
					//export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
					onClick={() => handleExportRows(table.getRowModel().rows)}
					leftSection={<IconDownload />}
					variant="filled"
				>
					Export Page Rows
				</Button>
			</Box>
		),
	});

	return <MantineReactTable table={table} />;
}
