import LazyBLTable from '@/app/(dashboard)/dashboard/bl/component/bl-table.lazy';
import { PageContainer } from '@/components/PageContainer/PageContainer';

export default function TablePage() {
	return (
		<PageContainer title="Bill of Lading's">
			<LazyBLTable />
		</PageContainer>
	);
}
