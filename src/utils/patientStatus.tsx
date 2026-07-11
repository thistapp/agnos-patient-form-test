import {PatientSession} from "@/lib/types/basePatientTypes";
import {WsStatus} from "@/lib/types/waStatusTypes";

const PatientStatus = (status: PatientSession["status"]) => {
	switch (status) {
		case "typing":
			return (
				<span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 animate-pulse'>
					🟢 Active (Typing)
				</span>
			);
		case "inactive":
			return (
				<span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200'>
					🟡 Inactive
				</span>
			);
		case "submitted":
			return (
				<span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200'>
					✅ Submitted
				</span>
			);
		case "joined":
		default:
			return (
				<span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-200'>
					🔵 Connected
				</span>
			);
	}
};

const PatientBadge = (status: WsStatus) => {
	switch (status) {
		case WsStatus.Connected:
			return (
				<span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200'>
					<span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
					Live Sync Connected
				</span>
			);
		case WsStatus.Connecting:
			return (
				<span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200'>
					<span className='w-2 h-2 rounded-full bg-amber-500 animate-bounce' />
					Connecting to Server...
				</span>
			);
		case WsStatus.Disconnected:
			return (
				<span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200'>
					<span className='w-2 h-2 rounded-full bg-rose-500' />
					Disconnected (Reconnecting)
				</span>
			);
	}
};

export {PatientStatus, PatientBadge};
