import LazyDashboardContent from '@/components/Dashboard/LazyDashboardContent';
import { PageContainer } from '@/components/PageContainer/PageContainer';

export default function Dashboard() {
	return (
		<PageContainer title="Dashboard">
			<LazyDashboardContent />
		</PageContainer>
	);
}
