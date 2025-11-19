import React from "react";

// components
import SmallHeading from "@/components/SmallHeading";
import Inquiry from "@/components/Inquiry";
import MainText from "@/components/MainText";

const ContactPage = () => {
  return (
    <main className="px-4 sm:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-4">
        <p className="bg-slate-400/25 p-5 rounded text-slate-500 mb-10">
          My studio is currently at capacity. However, you can join the waitlist
          by filling out the form below.
        </p>
        <SmallHeading>
          Use this form to make a trial lesson request!
        </SmallHeading>
        <Inquiry />
      </div>
    </main>
  );
};

export default ContactPage;
