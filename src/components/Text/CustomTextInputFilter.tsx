import { TextInput } from '@mantine/core';
import { MRT_Column } from 'mantine-react-table'; // Import column definition type
import React, { useState } from 'react';

interface CustomTextInputFilterProps {
	column: MRT_Column<any>; // Type for column definition with generic data type
	filterValue: string | undefined;
	onChange: (value: string) => void; // Function to update filter state
}

function CustomTextInputFilter({ column, filterValue, onChange }: CustomTextInputFilterProps) {
	const [inputValue, setInputValue] = useState<string>(filterValue || '');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			// Trigger filtering logic here (e.g., call an API endpoint)
			onChange(inputValue); // Update filter state with the entered value
		}
	};

	return (
		<TextInput
			placeholder={`Filter by ${column.header}`}
			value={inputValue}
			onChange={handleInputChange}
			onKeyDown={handleEnterPress}
		/>
	);
}

export default CustomTextInputFilter;
