import { Box, Button } from '@mantine/core';
import { useParams } from 'next/navigation';
import React from 'react';
import DataView from '@/components/Common/data-view';
import PreviewColumnView from '@/components/Common/preview-column';
import { useBl } from '../service';

const renderObjectDetail = (data?: Record<string, any> | string, dataKey?: string) => {
	if (typeof data === 'object')
		return <PreviewColumnView data={data ?? {}} titleKey={dataKey ?? 'id'} />;
	if (typeof data === 'string') return data;
	return '-';
};

const BLView = () => {
	const query = useParams();
	const { data } = useBl(query.id as string);
	return (
		<Box mb={20}>
			<DataView
				data={data ?? {}}
				customFormatValue={{
					consignee: () => renderObjectDetail(data?.consignee, 'name'),
					shipper: () => renderObjectDetail(data?.shipper, 'name'),
					notifyParty: () => renderObjectDetail(data?.notifyParty, 'name'),
					forDeliveryApplyTo: () => renderObjectDetail(data?.forDeliveryApplyTo, 'name'),
				}}
			/>

			<Button my={20} onClick={() => window.open('/api/generate-pdf?bl=' + data?.blNumber)}>
				Preview BL
			</Button>
		</Box>
	);
};

export default BLView;
