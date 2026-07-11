"use client";

import {useEffect, useRef} from "react";
import {useForm, FormProvider} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import BaseInput from "@/components/baseInputComponents";
import BaseTextarea from "@/components/baseTextareaComponents";
import BaseSelect from "@/components/baseSelectComponents";
import BaseDateInput from "@/components/baseDateInputComponents";
import BaseButton from "@/components/baseButtonComponents";
import {useRouter} from "next/navigation";
import {patientFormSchema, FormValues} from "@/lib/schema/patientFormSchema";
import {
	GenderOptions,
	LanguageOptions,
	NationalityOptions,
	ReligionOptions,
} from "@/mockData/dropdownData";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const Page = () => {
	const router = useRouter();
	const sessionIdRef = useRef<string>("");
	const socketRef = useRef<WebSocket | null>(null);
	const statusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const methods = useForm<FormValues>({
		resolver: zodResolver(patientFormSchema),
		defaultValues: {
			firstName: "",
			middleName: "",
			lastName: "",
			dateofbirth: null,
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
		mode: "onTouched",
	});

	const watchedValues = methods.watch();

	useEffect(() => {
		sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36)}`;

		const socket = new WebSocket("ws://localhost:8080");
		socketRef.current = socket;

		socket.onopen = () => {
			// console.log("[WebSocket] Client session started:", sessionIdRef.current);
			socket.send(
				JSON.stringify({
					sessionId: sessionIdRef.current,
					event: "joined",
					payload: {},
				}),
			);
		};

		socket.onerror = () => {
			// console.error("[WebSocket] Connection error");
		};

		socket.onclose = () => {
			// console.log("[WebSocket] Connection closed.");
		};

		return () => {
			if (socket.readyState === WebSocket.OPEN) {
				socket.send(
					JSON.stringify({
						sessionId: sessionIdRef.current,
						event: "left",
						payload: {},
					}),
				);
				socket.close();
			}
			if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
		};
	}, []);

	useEffect(() => {
		const socket = socketRef.current;
		if (!socket || socket.readyState !== WebSocket.OPEN) return;

		const dob = watchedValues.dateofbirth;
		const formattedPayload = {
			...watchedValues,
			dateofbirth: dob
				? dayjs.isDayjs(dob)
					? dob.format("YYYY-MM-DD")
					: dayjs(dob as unknown as string).format("YYYY-MM-DD")
				: null,
		};

		if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);

		socket.send(
			JSON.stringify({
				sessionId: sessionIdRef.current,
				event: "typing",
				payload: formattedPayload,
			}),
		);

		statusTimeoutRef.current = setTimeout(() => {
			if (socket && socket.readyState === WebSocket.OPEN) {
				socket.send(
					JSON.stringify({
						sessionId: sessionIdRef.current,
						event: "inactive",
						payload: formattedPayload,
					}),
				);
			}
		}, 5000);
	}, [watchedValues]);

	const onSubmit = (data: FormValues) => {
		const formattedData = {
			...data,
			dateofbirth: data.dateofbirth
				? data.dateofbirth.format("YYYY-MM-DD")
				: null,
		};

		if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
			socketRef.current.send(
				JSON.stringify({
					sessionId: sessionIdRef.current,
					event: "submitted",
					payload: formattedData,
				}),
			);
		}
		Swal.fire({
			title: "Form submitted successfully!",
			icon: "success",
		});
	};

	return (
		<div className='w-full max-w-208 my-8 flex flex-col items-center'>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='w-full bg-white shadow-md rounded-lg flex flex-col items-center justify-center p-4 border border-gray-200'
				>
					<h1 className='w-full text-2xl font-bold mb-6 text-left px-4'>
						Patient Form
					</h1>
					<div className='w-full grid grid-cols-1 gap-4 p-4'>
						<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
							<BaseInput
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='firstName'
								labelName='First Name'
							/>
							<BaseInput
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='middleName'
								labelName='Middle Name'
							/>
							<BaseInput
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='lastName'
								labelName='Last Name'
							/>
						</div>

						<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
							<BaseDateInput
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='dateofbirth'
								labelName='Date of Birth'
							/>
							<BaseSelect
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='gender'
								labelName='Gender'
								options={GenderOptions}
							/>
						</div>

						<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
							<BaseInput
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='phoneNumber'
								labelName='Phone Number'
							/>
							<BaseInput
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='email'
								labelName='Email'
							/>
						</div>

						<div className='w-full grid grid-cols-1'>
							<BaseTextarea
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='address'
								labelName='Address'
							/>
						</div>

						<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
							<BaseSelect
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='preferredLanguage'
								labelName='Preferred Language'
								options={LanguageOptions}
							/>
							<BaseSelect
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='nationality'
								labelName='Nationality'
								options={NationalityOptions}
							/>
							<BaseSelect
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='religion'
								labelName='Religion'
								options={ReligionOptions}
							/>
						</div>

						<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
							<div className='md:col-span-3 border-b border-gray-200 pb-2 mb-2'>
								<h2 className='text-lg font-semibold text-gray-700'>
									Emergency Contact
								</h2>
							</div>
							<BaseInput
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='emergencyContactName'
								labelName='Emergency Contact Name'
							/>
							<BaseInput
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='emergencyContactPhone'
								labelName='Emergency Contact Phone'
							/>
							<BaseInput
								className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
								name='emergencyContactRelationship'
								labelName='Emergency Contact Relationship'
							/>
						</div>
					</div>

					<div className='w-full flex justify-end gap-4 mt-8 px-4'>
						<BaseButton
							type='button'
							className='px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer text-gray-700 font-medium transition'
							onClick={() => router.push("/")}
						>
							Back
						</BaseButton>
						<BaseButton
							type='submit'
							className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer font-medium transition'
						>
							Submit
						</BaseButton>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default Page;
