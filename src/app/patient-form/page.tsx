"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseInput from "@/components/baseInputComponents";
import BaseTextarea from "@/components/baseTextareaComponents";
import BaseSelect from "@/components/baseSelectComponents";
import BaseDateInput from "@/components/baseDateInputComponents";
import BaseButton from "@/components/baseButtonComponents";
import { useRouter } from "next/navigation";
import { patientFormSchema, FormValues } from "@/lib/schema/patientFormSchema";
import {
  GenderOptions,
  LanguageOptions,
  NationalityOptions,
  ReligionOptions,
} from "@/mockData/dropdownData";

const Page = () => {
  const router = useRouter();
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

  const onSubmit = (data: FormValues) => {
    console.log("Form Data Submitted:", data);
    alert(
      "Form submitted successfully! Check console for full data (dateofbirth is stored as dayjs).",
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-208 w-full flex flex-col items-center justify-center p-4"
      >
        <h1 className="w-full text-2xl font-bold mb-6 text-left px-4">
          Patient Form
        </h1>
        <div className="w-full grid grid-cols-1 gap-4 p-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <BaseInput name="firstName" labelName="First Name" />
            <BaseInput name="middleName" labelName="Middle Name" />
            <BaseInput name="lastName" labelName="Last Name" />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseDateInput name="dateofbirth" labelName="Date of Birth" />
            <BaseSelect
              name="gender"
              labelName="Gender"
              options={GenderOptions}
            />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput name="phoneNumber" labelName="Phone Number" />
            <BaseInput name="email" labelName="Email" />
          </div>

          <div className="w-full grid grid-cols-1">
            <BaseTextarea name="address" labelName="Address" />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <BaseSelect
              name="preferredLanguage"
              labelName="Preferred Language"
              options={LanguageOptions}
            />
            <BaseSelect
              name="nationality"
              labelName="Nationality"
              options={NationalityOptions}
            />
            <BaseSelect
              name="religion"
              labelName="Religion"
              options={ReligionOptions}
            />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="md:col-span-3 border-b border-gray-200 pb-2 mb-2">
              <h2 className="text-lg font-semibold text-gray-700">
                Emergency Contact
              </h2>
            </div>
            <BaseInput
              name="emergencyContactName"
              labelName="Emergency Contact Name"
            />
            <BaseInput
              name="emergencyContactPhone"
              labelName="Emergency Contact Phone"
            />
            <BaseInput
              name="emergencyContactRelationship"
              labelName="Emergency Contact Relationship"
            />
          </div>
        </div>

        <div className="w-full flex justify-end gap-4 mt-8 px-4">
          <BaseButton
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer text-gray-700 font-medium"
            onClick={() => router.push("/")}
          >
            Back
          </BaseButton>
          <BaseButton
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer font-medium"
          >
            Submit
          </BaseButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default Page;
