export interface PatientSession {
	sessionId: string;
	status: "joined" | "typing" | "inactive" | "submitted" | "left";
	firstName: string;
	middleName?: string;
	lastName: string;
	dateofbirth: string | null;
	gender: string;
	phoneNumber: string;
	email: string;
	address: string;
	preferredLanguage: string;
	nationality: string;
	religion: string;
	emergencyContactName: string;
	emergencyContactPhone: string;
	emergencyContactRelationship: string;
	timestamp: string;
}
