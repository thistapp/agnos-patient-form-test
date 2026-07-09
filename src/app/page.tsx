"use client";

import BaseButton from "@/components/baseButtonComponents";
import {useRouter} from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<div className='size-full'>
			<div className='flex flex-wrap gap-4'>
				<BaseButton
					className='p-4 border-2 border-black rounded-lg cursor-pointer'
					onClick={() => router.push("/patient-form")}
				>
					patient-form
				</BaseButton>
				<BaseButton
					className='p-4 border-2 border-black rounded-lg cursor-pointer'
					onClick={() => alert("Button clicked!")}
				>
					ddsadas
				</BaseButton>
			</div>
		</div>
	);
}
