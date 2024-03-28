import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

type DocKind = 'bl' | 'inv' | 'cn' | '';
type DrawableData = Array<{ key: string; value: string | Array<string> }>;

class TemplateCache {
	cache: Record<string, Uint8Array> = {};

	setBl(doc: Uint8Array, kind: DocKind) {
		this.cache[kind] = doc;
	}
}

const templateCache = new TemplateCache();

async function getTemplate(kind: DocKind): Promise<Uint8Array> {
	if (templateCache.cache[kind]) {
		console.info('get template from cached');
		return templateCache.cache[kind];
	}
	// retrive from buckets
	const url = `https://khnokwivarjrhgfpwhkg.supabase.co/storage/v1/object/public/kls-bucket/${kind}-template-form.pdf`;
	console.info({ url }, '[fetch url]');
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch PDF');
	}
	const res = await response.arrayBuffer();
	const data = new Uint8Array(res);
	templateCache.cache[kind] = data;

	return data;
}

async function getDrawableBl(id: string): Promise<DrawableData> {
	return [
		{ key: 'blNumber', value: 'BLJKT0215001' },
		{
			key: 'shipper',
			value: [
				`Mario is a fictional character in the school of a class`,
				`owned by Nintendo and created by`,
				`Miyamoto. Serving as the`,
				`company's mascot and the eponymous`,
			],
		},
	];
}
async function getDrawableInv(id: string): Promise<DrawableData> {
	return [];
}
async function getDrawableCn(id: string): Promise<DrawableData> {
	return [];
}

async function getDrawableData(id: string, kind: DocKind) {
	switch (kind) {
		case 'bl':
			return getDrawableBl(id);
		case 'inv':
			return getDrawableInv(id);
		case 'cn':
			return getDrawableCn(id);
	}

	return [];
}

async function updatePdf(template: Uint8Array, data: DrawableData, title: string) {
	const pdfDoc = await PDFDocument.load(template);
	pdfDoc.setTitle(title);
	// // Modify the PDF content based on data
	// const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

	// const page = pdfDoc.getPages()[0]; // Assuming single-page template

	const form = pdfDoc.getForm();

	data.forEach(item => {
		const field = form.getTextField(item.key);
		if (field) {
			const text =
				typeof item.value === 'string' ? item.value : (item.value as Array<string>).join('\n');
			field.setText(text.toUpperCase());
		}
	});

	form.flatten();

	return pdfDoc.save();
}

export async function GET(req: NextRequest, res: NextResponse) {
	try {
		const { searchParams } = new URL(req.url);
		const bl = searchParams.get('bl');
		const inv = searchParams.get('inv');
		const cn = searchParams.get('cn');

		let templateBuffer = new Uint8Array();
		let drawData: DrawableData = [];
		let kind: DocKind = '';
		if (bl) {
			kind = 'bl';
			templateBuffer = await getTemplate(kind);
			drawData = await getDrawableData(bl, kind);
		} else if (inv) {
			kind = 'inv';
			templateBuffer = await getTemplate(kind);
			drawData = await getDrawableData(inv, kind);
		} else if (cn) {
			kind = 'cn';
			templateBuffer = await getTemplate(kind);
			drawData = await getDrawableData(cn, kind);
		}

		const pdfTitle = ((bl || inv || cn) ?? 'new document') + '-' + new Date().toLocaleDateString();
		const pdfBytes = await updatePdf(templateBuffer, drawData, pdfTitle);

		const headers = {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `inline; filename="${pdfTitle}.pdf"`,
		};

		// Return the PDF data as the response
		return new NextResponse(pdfBytes, { headers });
	} catch (error) {
		return NextResponse.json({ message: (error as Error).message }, { status: 500 });
	}
}
