import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { BillOfLading } from '../../app/(dashboard)/dashboard/bl/service/types';
import { CommonResponse } from '../types';

export const getProducts = async () => {
	const res = await ky.get('/mock/billOfLading.json').json();

	return res;
};

export const useProducts = () =>
	useQuery({
		queryKey: ['products'],
		queryFn: () => getProducts(),
	});
