import * as XLSX from 'xlsx';

export function exportToExcel<T>(data: T[], fileName: string, endColumn = 'Z1') {
	// Convert the data to a worksheet
	const worksheet = XLSX.utils.json_to_sheet(data);

	const headerRange = XLSX.utils.decode_range('A1:' + endColumn);

	// Apply styles to header row cells, clearing any prior styles
	for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
		const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
		const cell = worksheet[cellAddress];
		cell.s = {}; // Clear styles
		cell.s = {
			font: { bold: true },
			fill: { fgColor: { rgb: 'DDDDDD' } },
		};
	}

	// Convert camelCase header titles to capitalized case
	const formattedHeaders = [];
	for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
		const header = worksheet[XLSX.utils.encode_cell({ r: 0, c: col })].v;
		formattedHeaders.push(camelCaseToCapitalize(header));
	}

	// Create a separate header row array with existing styles and capitalized content
	const styledHeaderRow = [];
	for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
		const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
		const cell = worksheet[cellAddress];
		styledHeaderRow.push({ v: formattedHeaders[col - headerRange.s.c], s: cell.s }); // Include capitalized value & existing style
	}

	// Update the header row with the formatted titles
	XLSX.utils.sheet_add_aoa(worksheet, [styledHeaderRow], { origin: 'A1' });

	// Create a new workbook
	const workbook = XLSX.utils.book_new();

	// Add the worksheet to the workbook
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

	// Generate the Excel file
	const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

	// Create a Blob from the Excel file data
	const excelBlob = new Blob([excelBuffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	});

	// Create a download link for the Excel file
	const downloadLink = window.URL.createObjectURL(excelBlob);

	// Create a temporary anchor element to trigger the download
	const anchor = document.createElement('a');
	anchor.href = downloadLink;
	anchor.download = `${fileName}.xlsx`;

	// Append the anchor to the document
	document.body.appendChild(anchor);

	// Click the anchor to trigger the download
	anchor.click();

	// Clean up the anchor and revoke the object URL
	document.body.removeChild(anchor);
	window.URL.revokeObjectURL(downloadLink);
}

function camelCaseToCapitalize(input: string): string {
	// Split the input string by camel case (lowercase followed by uppercase)
	const words = input.split(/(?=[A-Z])/);

	// Capitalize the first letter of each word
	const capitalizedWords = words.map(word => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	// Join the words back together with spaces
	return capitalizedWords.join(' ');
}
