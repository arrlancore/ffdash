import { Box } from '@mantine/core';
import ky from 'ky';
import { useParams } from 'next/navigation';
import { PDFDocument, PDFField, PDFForm } from 'pdf-lib';
import React, { useEffect, useState } from 'react';
import { useBl } from '../service';
import { BillOfLading } from '../service/types';

const BLViewPDF = () => {
	const query = useParams();
	const { data } = useBl(query.id as string);
	const [templateData, setTemplateData] = useState<ArrayBuffer | null>(null);

	useEffect(() => {
		const fetchTemplate = async () => {
			const response = await fetch('/templates/bl-template.pdf');
			const buffer = await response.arrayBuffer();
			setTemplateData(buffer);
		};

		fetchTemplate();
	}, []);

	const generatePdfRemote = async () => {
		const response = await ky.post('/api/generate-bl', {
			json: {
				templateBuffer: templateData, // Assuming template data is an ArrayBuffer
				data: { name: 'Arlan', email: 'arlan@mail.com' },
			},
		});

		if (response.status === 200) {
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = 'generated.pdf';
			link.click();
		} else {
			console.error('Failed to generate PDF:', await response.text());
		}
	};

	return (
		<Box mb={20}>
			<button type="button" onClick={generatePdfRemote}>
				Generate PDF
			</button>
		</Box>
	);
};

export default BLViewPDF;
