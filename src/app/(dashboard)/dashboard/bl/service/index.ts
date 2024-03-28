import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { CommonResponse, PaginationOptions } from '@/services/types';
import { BillOfLading } from './types';

export interface GetBLFilter {
	blNumber?: string;
	'shipper.name'?: string;
	'consignee.name'?: string;
	portOfLoading?: string;
	shipmentDate?: string;
}

export const getBls = async (options?: PaginationOptions<GetBLFilter>) => {
	const res = await ky.get('/mock/billOfLading.json').json();

	return res as CommonResponse<BillOfLading>;
};

export const useBls = (options?: PaginationOptions<GetBLFilter>) =>
	useQuery<CommonResponse<BillOfLading>>({
		queryKey: ['billOfLadings', options],
		queryFn: () => getBls(options),
	});

export const getBl = async (blNumber: string) => {
	const res = await ky.get('/mock/billOfLading.json').json();

	const data = res as CommonResponse<BillOfLading>;

	return data.result[0];
};

export const useBl = (blNumber: string) =>
	useQuery<BillOfLading>({
		queryKey: ['billOfLading', blNumber],
		queryFn: () => getBl(blNumber),
	});
