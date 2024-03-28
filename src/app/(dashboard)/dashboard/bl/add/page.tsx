import { PageContainer } from '@/components/PageContainer/PageContainer';
import BLFormLazy from '../component/bl-form.lazy';

export default function Form() {
	return (
		<PageContainer title="Add Bill of Lading">
			<BLFormLazy />
		</PageContainer>
	);
}
