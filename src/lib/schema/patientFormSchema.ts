import * as z from "zod";
import dayjs, {Dayjs} from "dayjs";

export const patientFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    dateofbirth: z
        .custom<Dayjs | null>(
            (val) => val !== null && dayjs.isDayjs(val) && val.isValid(),
            {
                message: "Date of birth is required and must be a valid date",
            }
        ),
    gender: z.string().min(1, "Gender is required"),
    phoneNumber: z
        .string()
        .min(1, "Phone number is required")
        .refine((val) => {
            const clean = val.replace(/[- ]/g, "");
            return /^0[2-9]\d{7,8}$/.test(clean);
        }, "Invalid Thailand phone number format (must start with 0 and be 9-10 digits)"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format (e.g. name@example.com)"),
    address: z.string().min(1, "Address is required"),
    preferredLanguage: z.string().min(1, "Preferred language is required"),
    nationality: z.string().min(1, "Nationality is required"),
    religion: z.string().min(1, "Religion is required"),
    emergencyContactName: z.string().min(1, "Emergency contact name is required"),
    emergencyContactPhone: z
        .string()
        .min(1, "Emergency contact phone is required")
        .refine((val) => {
            const clean = val.replace(/[- ]/g, "");
            return /^0[2-9]\d{7,8}$/.test(clean);
        }, "Invalid Thailand phone number format (must start with 0 and be 9-10 digits)"),
    emergencyContactRelationship: z
        .string()
        .min(1, "Relationship is required"),
});

export type FormValues = z.infer<typeof patientFormSchema>;