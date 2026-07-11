"use client";

import BaseButton from "@/components/baseButtonComponents";
import {useRouter} from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<div className='w-full max-w-xl bg-white shadow-md border border-gray-200 rounded-xl p-8 flex flex-col items-center'>
			<h1 className='text-2xl font-bold text-gray-800 tracking-tight mb-2 text-center'>
				Agnos Patient Portal
			</h1>
			<p className='text-sm text-gray-500 mb-8 text-center'>
				Select an action below to access the forms or monitor incoming
				submissions
			</p>
			<div className='w-full flex flex-col gap-4'>
				<BaseButton
					className='w-full p-4 border border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg cursor-pointer flex items-center justify-between transition'
					onClick={() => router.push("/patient-form")}
				>
					<span>Patient Registration Form</span>
				</BaseButton>
				<BaseButton
					className='w-full p-4 border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 font-semibold rounded-lg cursor-pointer transition flex items-center justify-between '
					onClick={() => router.push("/patient-dashboard")}
				>
					<span>Live Patient Sync Dashboard</span>
				</BaseButton>
			</div>
		</div>
	);
}
