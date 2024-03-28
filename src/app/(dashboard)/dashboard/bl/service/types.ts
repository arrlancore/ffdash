interface Company {
	name: string;
	address: string;
	city: string;
	state?: string;
	country: string;
	contactPerson?: string;
	contactEmail?: string;
	contactPhone?: string;
	summary?: string;
}

export interface BillOfLading {
	blNumber: string;
	shipper: Company;
	consignee: Company;
	notifyParty?: Company;
	forDeliveryApplyTo?: Company;
	placeOfReceipt: string;
	oceanVesselVoyNo: string;
	preCarriageVoyNo: string;
	portOfLoading: string;
	portOfDischarge: string;
	placeOfDelivery: string;
	finalDestination: string;
	containerNo: string;
	numberOfContainersOrPackages: string;
	descriptionOfGoods: string;
	grossWeight: number;
	measurement: number;
	totalNumberOfContainersOrPackages: string;
	freightAndCharges: string;
	revenueTons?: number;
	rate?: number;
	prepaid?: number;
	collect?: number;
	exRate?: number;
	prepaidAt: string;
	payableAt: string;
	placeOfIssue: string;
	dateOfIssue: string;
	// form pdf: placeAndDateOfIssue
	portOfDischargeNo: string;
	numberOfOriginalsBlIssued: string;
	shipmentDate: string;
	vessel: string;
	invoiceId?: string;
	creditNoteId?: string;
}
