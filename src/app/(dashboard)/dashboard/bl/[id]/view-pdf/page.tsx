import { PageContainer } from '@/components/PageContainer/PageContainer';
import BLViewPDFLazy from '../../component/bl-view-pdf.lazy';

export default function ViewBL() {
	return (
		<PageContainer title="BL Docs">
			<BLViewPDFLazy />
		</PageContainer>
	);
}
