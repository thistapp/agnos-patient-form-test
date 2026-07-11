import {BaseDisplayProps} from "@/lib/types/baseComponentTypes";

const BaseDisplayComponents = ({
	className = "",
	fontSize,
	titleSection,
	sessionData,
	placeholder,
}: BaseDisplayProps) => {
	const renderFieldVal = (
		val: string | null | undefined,
		placeholder = "Waiting...",
	) => {
		if (!val || val.trim() === "") {
			return (
				<span className='text-gray-400 italic font-light'>{placeholder}</span>
			);
		}
		return <span className='font-semibold text-gray-800'>{val}</span>;
	};

	return (
		<div className={`${className} flex flex-wrap justify-between`}>
			<span className={`text-gray-500 ${fontSize ? ` text-${fontSize}` : ""}`}>
				{titleSection}
			</span>
			{renderFieldVal(sessionData, placeholder)}
		</div>
	);
};

export default BaseDisplayComponents;
