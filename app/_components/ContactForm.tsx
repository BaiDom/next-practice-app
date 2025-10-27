"use client";

import { useActionState, useEffect } from "react";
import { ContactType } from "../_types/contact";
import { useRouter } from "next/navigation";

type ContactFormProps = {
  action: (prevState: any, formData: FormData) => Promise<any>;
  contact?: ContactType;
};

const ContactForm = ({ action, contact }: ContactFormProps) => {
  const router = useRouter();
  const [state, formAction] = useActionState(action, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/contact");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-x-4">
      <input type="hidden" name="id" value={contact?.id} />
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          defaultValue={contact?.name || ""}
          placeholder="Enter your name"
          className="mt-1 block w-f rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          required
        ></input>
      </div>
      <div className="mt-3">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          defaultValue={contact?.email || ""}
          className="mt-1 block w-f rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          required
        ></input>
      </div>
      {state?.error && (
        <div className="mt-2 text-red-500 text-sm">{state.error}</div>
      )}
      <button
        type="submit"
        className="mt-3 px-4 block w-f py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Save Contact
      </button>
    </form>
  );
};

export default ContactForm;
