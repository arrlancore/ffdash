'use client';
import '@mantine/dates/styles.css';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Autocomplete,
	Box,
	Button,
	Group,
	NumberInput,
	Paper,
	SimpleGrid,
	Space,
	Stepper,
	Text,
	Textarea,
	TextInput,
	useMantineColorScheme,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { modals } from '@mantine/modals';
import dayjs from 'dayjs';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
	FieldErrors,
	useForm,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetError,
	UseFormSetValue,
} from 'react-hook-form';
import { z } from 'zod';
import { PreviewAction } from '@/components/Common/preview-action';

const schema = z.object({
	blNumber: z.string().min(8, { message: 'BL Number is required' }),
	shipper: z.string().min(8, { message: 'Shipper is required' }),
	consignee: z.string().min(1, { message: 'Consignee is required' }),
	notifyParty: z.string().min(1, { message: 'Notify Party is required' }),
	forDeliveryApplyTo: z.string(),
	placeOfReceipt: z.string(),
	oceanVesselVoyNo: z.string(),
	portOfLoading: z.string(),
	portOfDischarge: z.string(),
	placeOfDelivery: z.string(),
	finalDestination: z.string(),
	containerNo: z.string(),
	marksAndNumbers: z.string(),
	numberOfContainersOrPackages: z.string(),
	kindOfPackages: z.string(),
	descriptionOfGoods: z.string(),
	netWeight: z.number(),
	grossWeight: z.number(),
	measurement: z.number(),
	totalNumberOfContainersOrPackages: z.string(),
	freightAndCharges: z.string(),
	revenueTons: z.number().optional(),
	rate: z.number().optional(),
	prepaid: z.number().optional(),
	collect: z.number().optional(),
	exRate: z.number().optional(),
	prepaidAt: z.string(),
	payableAt: z.string(),
	placeOfIssue: z.string(),
	dateOfIssue: z.string(),
	portOfDischargeNo: z.string(),
	numberOfOriginalsBlIssued: z.string(),
	shipmentDate: z.string(),
	vessel: z.string(),
	invoiceId: z.string().optional(),
	creditNoteId: z.string().optional(),
});

type BillOfLading = z.infer<typeof schema>;

export const BLForm = () => {
	const TOTAL_STEP = 5;
	const { colorScheme } = useMantineColorScheme();
	const [activeStep, setActiveStep] = useState(0);
	const nextStep = () => setActiveStep(current => (current < TOTAL_STEP ? current + 1 : current));
	const prevStep = () => setActiveStep(current => (current > 0 ? current - 1 : current));
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
		getValues,
	} = useForm<BillOfLading>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: BillOfLading) =>
		modals.openConfirmModal({
			title: 'Are you sure to submit this new BL?',
			children: <Text size="sm">{data.blNumber}</Text>,
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			onConfirm: () => console.log('Confirmed'),
		});

	return (
		<Paper withBorder shadow="md" p="md" bg={colorScheme === 'dark' ? '#333' : '#fafafa'}>
			<Box<'form'>>
				<BLStepper
					activeStep={activeStep}
					setActiveStep={setActiveStep}
					formContext={{
						register,
						errors,
						setValue,
						setError,
						getValues,
					}}
				/>

				<Space h="md" />
			</Box>
			<Group justify="center" mt="xl">
				{activeStep !== 0 && (
					<Button variant="default" onClick={prevStep}>
						Back
					</Button>
				)}
				{activeStep !== TOTAL_STEP && <Button onClick={nextStep}>Next step</Button>}
				{activeStep === TOTAL_STEP && <Button onClick={handleSubmit(onSubmit)}>Preview</Button>}
			</Group>
		</Paper>
	);
};

// Autocomplete component for shipper, consignee, notify party, and deliveryApplyTo
type AutocompleteFieldProps = {
	label: string;
	name: string;
	initialValue?: string;
	register: any;
	error?: any;
	rightSection?: ReactNode;
};
const AutocompleteField = ({
	label,
	name,
	register,
	error,
	initialValue,
	rightSection,
}: AutocompleteFieldProps) => {
	return (
		<Autocomplete
			label={label}
			placeholder={`Select ${label}`}
			data={[]}
			value={initialValue} // Set the initial value (null or an existing value)
			onChange={selected => {
				// Handle the selected value (e.g., update form state)
				console.log(`Selected ${label}:`, selected);
			}}
			{...register(name)} // Register the field with react-hook-form
			error={error && error.message}
			rightSection={<PreviewAction />}
		/>
	);
};

type StepContentProps = {
	formContext: FormContextShared;
};

const Step1Content = ({ formContext: { errors, register, setValue } }: StepContentProps) => (
	<SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="sm">
		<TextInput
			label="BL Number"
			placeholder="Input the BL Number"
			error={errors.blNumber && errors.blNumber.message}
			{...register('blNumber')}
		/>
		<AutocompleteField label="Shipper" name="shipper" register={register} error={errors.shipper} />
		<AutocompleteField
			label="Consignee"
			name="consignee"
			register={register}
			error={errors.consignee}
		/>
		<AutocompleteField
			label="Notify Party"
			name="notifyParty"
			register={register}
			error={errors.notifyParty}
		/>
		<AutocompleteField
			label="For Delivery Apply To"
			name="forDeliveryApplyTo"
			register={register}
			error={errors.forDeliveryApplyTo}
		/>
		<TextInput
			label="Place of Receipt"
			placeholder="Input the Place of Receipt"
			error={errors.blNumber && errors.blNumber.message}
			{...register('placeOfReceipt')}
		/>
		<TextInput
			label="Ocean Vessel Voy No"
			placeholder="Input the Ocean Vessel Voy No"
			error={errors.blNumber && errors.blNumber.message}
			{...register('oceanVesselVoyNo')}
		/>
		<AutocompleteField
			label="Port of Loading"
			name="portOfLoading"
			register={register}
			error={errors.portOfLoading}
		/>
		<AutocompleteField
			label="Port of Discharge"
			name="portOfDischarge"
			register={register}
			error={errors.portOfDischarge}
		/>
		<AutocompleteField
			label="Place of Delivery"
			name="placeOfDelivery"
			register={register}
			error={errors.placeOfDelivery}
		/>
		<TextInput
			label="Final Destination"
			placeholder="Input Final Destination"
			error={errors.finalDestination && errors.finalDestination.message}
			{...register('finalDestination')}
		/>
		<DatePickerInput
			label="Shipment Date"
			placeholder="Select a Date"
			valueFormat="DD/MM/YYYY"
			error={errors.shipmentDate && errors.shipmentDate.message}
			{...(register('shipmentDate'),
			{
				onChange: value => {
					const selectedDate = value!.toISOString();
					const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY');
					setValue('shipmentDate', formattedDate);
				},
			})}
		/>
	</SimpleGrid>
);
const Step2Content = ({ formContext: { errors, register } }: StepContentProps) => (
	<SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="sm">
		<TextInput
			label="Container No"
			placeholder="Input the Container No"
			error={errors.containerNo && errors.containerNo.message}
			{...register('containerNo')}
		/>
		<TextInput
			label="Marks and Numbers"
			placeholder="Input the Marks and Numbers"
			error={errors.marksAndNumbers && errors.marksAndNumbers.message}
			{...register('marksAndNumbers')}
		/>
		<TextInput
			type="number"
			label="Number of Containers or Packages"
			placeholder="Input the Number"
			error={errors.numberOfContainersOrPackages && errors.numberOfContainersOrPackages.message}
			{...register('numberOfContainersOrPackages')}
		/>
		<AutocompleteField
			label="Kind of Packages"
			name="kindOfPackages"
			register={register}
			error={errors.kindOfPackages}
		/>
		<Textarea
			label="Description of Goods"
			maxRows={6}
			placeholder="Input the Description"
			error={errors.descriptionOfGoods && errors.descriptionOfGoods.message}
			{...register('descriptionOfGoods')}
		/>
	</SimpleGrid>
);
const Step3Content = ({ formContext: { errors, register } }: StepContentProps) => (
	<SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="sm">
		<TextInput
			type="number"
			label="Net Weight"
			placeholder="Input the Net Weight"
			error={errors.netWeight && errors.netWeight.message}
			{...register('netWeight')}
		/>
		<TextInput
			type="number"
			label="Gross Weight"
			placeholder="Input the Gross Weight"
			error={errors.grossWeight && errors.grossWeight.message}
			{...register('grossWeight')}
		/>
		<TextInput
			type="number"
			label="Measurement"
			placeholder="Input the Measurement"
			error={errors.measurement && errors.measurement.message}
			{...register('measurement')}
		/>
		<TextInput
			type="number"
			label="Total Number of Containers or Packages"
			placeholder="Input the Total Number"
			error={
				errors.totalNumberOfContainersOrPackages && errors.totalNumberOfContainersOrPackages.message
			}
			{...register('totalNumberOfContainersOrPackages')}
		/>
	</SimpleGrid>
);
const Step4Content = ({ formContext: { errors, register } }: StepContentProps) => (
	<SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="sm">
		<TextInput
			label="Freight and Charges"
			type="text"
			placeholder="Input Freight and Charges"
			error={errors.freightAndCharges && errors.freightAndCharges.message}
			{...register('freightAndCharges')}
		/>
		<TextInput
			label="Revenue Tons"
			type="number"
			placeholder="Input Revenue Tons"
			error={errors.revenueTons && errors.revenueTons.message}
			{...register('revenueTons')}
		/>
		<TextInput
			label="Rate"
			type="number"
			placeholder="Input Rate"
			error={errors.rate && errors.rate.message}
			{...register('rate')}
		/>
		<TextInput
			label="Prepaid"
			type="number"
			placeholder="Input Prepaid"
			error={errors.prepaid && errors.prepaid.message}
			{...register('prepaid')}
		/>
		<TextInput
			label="Collect"
			type="number"
			placeholder="Input Collect"
			error={errors.collect && errors.collect.message}
			{...register('collect')}
		/>
		<TextInput
			label="Exchange Rate"
			type="number"
			placeholder="Input Exchange Rate"
			error={errors.exRate && errors.exRate.message}
			{...register('exRate')}
		/>
		<AutocompleteField
			label="Prepaid At"
			name="prepaidAt"
			register={register}
			error={errors.prepaidAt}
		/>
		<AutocompleteField
			label="Payable At"
			name="payableAt"
			register={register}
			error={errors.payableAt}
		/>
	</SimpleGrid>
);
const Step5Content = ({ formContext: { errors, register, setValue } }: StepContentProps) => (
	<SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="sm">
		<TextInput
			label="Place of Issue"
			placeholder="Input Place of Issue"
			error={errors.placeOfIssue && errors.placeOfIssue.message}
			{...register('placeOfIssue')}
		/>

		<DatePickerInput
			valueFormat="DD/MM/YYYY"
			label="Date of Issue"
			placeholder="Date of Issue"
			error={errors.dateOfIssue && errors.dateOfIssue.message}
			{...(register('dateOfIssue'),
			{
				onChange: value => {
					const selectedDate = value!.toISOString();
					const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY');
					setValue('dateOfIssue', formattedDate);
				},
			})}
		/>
		<TextInput
			label="Port of Discharge No"
			placeholder="Input Port of Discharge No"
			error={errors.portOfDischargeNo && errors.portOfDischargeNo.message}
			{...register('portOfDischargeNo')}
		/>
		<TextInput
			type="number"
			label="Number of Originals BL Issued"
			placeholder="Input Number of Originals BL Issued"
			error={errors.numberOfOriginalsBlIssued && errors.numberOfOriginalsBlIssued.message}
			{...register('numberOfOriginalsBlIssued')}
		/>
		<TextInput
			label="Vessel"
			placeholder="Input Vessel"
			error={errors.vessel && errors.vessel.message}
			{...register('vessel')}
		/>
	</SimpleGrid>
);
const steps = [
	{
		label: 'Shipment Details',
		description: 'Enter shipment details',
		content: Step1Content,
	},
	{
		label: 'Container Information',
		description: 'Provide container info',
		content: Step2Content,
	},
	{
		label: 'Weight and Measurement',
		description: 'Enter weight and measurement',
		content: Step3Content,
	},
	{
		label: 'Charges and Rates',
		description: 'Provide charges and rates',
		content: Step4Content,
	},
	{
		label: 'Additional Information',
		description: 'Enter additional details',
		content: Step5Content,
	},
];

type FormContextShared = {
	register: UseFormRegister<BillOfLading>;
	setValue: UseFormSetValue<BillOfLading>;
	errors: FieldErrors<BillOfLading>;
	setError: UseFormSetError<BillOfLading>;
	getValues: UseFormGetValues<BillOfLading>;
};
type BLStepperProps = {
	activeStep: number;
	setActiveStep: Dispatch<SetStateAction<number>>;
	formContext: FormContextShared;
};
const BLStepper = ({ activeStep, setActiveStep, formContext }: BLStepperProps) => {
	return (
		<Stepper
			active={activeStep}
			iconSize={18}
			styles={{
				stepLabel: { fontSize: 12 },
				stepDescription: { fontSize: 11 },
			}}
		>
			{steps.map((step, index) => (
				<Stepper.Step
					key={index}
					label={step.label}
					description={step.description}
					onClick={() => setActiveStep(index)}
				>
					<step.content formContext={formContext} />
				</Stepper.Step>
			))}
		</Stepper>
	);
};
