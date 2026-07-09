"use client";

import {useForm, FormProvider} from "react-hook-form";
import BaseInput from "@/components/baseInputComponents";
import BaseTextarea from "@/components/baseTextareaComponents";

const Page = () => {
	const methods = useForm({
		defaultValues: {
			firstName: "",
			middleName: "",
			lastName: "",
			dateofbirth: "",
			gender: "",
			phoneNumber: "",
			email: "",
			address: "",
			preferredLanguage: "",
			nationality: "",
			religion: "",
			emergencyContactName: "",
			emergencyContactPhone: "",
			emergencyContactRelationship: "",
		},
	});

	return (
		<FormProvider {...methods}>
			<div className='max-w-208 size-full flex flex-col items-center justify-center'>
				<h1 className='w-full text-2xl font-bold mb-4 text-left px-4'>
					Patient Form
				</h1>
				<div className='w-full grid grid-cols-1 gap-4 p-4'>
					<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
						<BaseInput name='firstName' labelName='First Name' />
						<BaseInput name='middleName' labelName='Middle Name' />
						<BaseInput name='lastName' labelName='Last Name' />
					</div>
					<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
						<BaseInput name='dateofbirth' labelName='Date of Birth' />
						<BaseInput name='gender' labelName='Gender' />
					</div>
					<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
						<BaseInput name='phoneNumber' labelName='Phone Number' />
						<BaseInput name='email' labelName='Email' />
					</div>
					<div className='w-full grid grid-cols-1'>
						<BaseTextarea name='firstName' labelName='address' />
					</div>
					<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
						<BaseInput
							name='preferredLanguage'
							labelName='Preferred Language'
						/>
						<BaseInput name='nationality' labelName='Nationality' />
						<BaseInput name='religion' labelName='Religion' />
					</div>
					<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
						<BaseInput
							name='emergencyContactName'
							labelName='Emergency Contact Name'
						/>
						<BaseInput
							name='emergencyContactPhone'
							labelName='Emergency Contact Phone'
						/>
						<BaseInput
							name='emergencyContactRelationship'
							labelName='Emergency Contact Relationship'
						/>
					</div>
				</div>
			</div>
		</FormProvider>
	);
};

export default Page;
