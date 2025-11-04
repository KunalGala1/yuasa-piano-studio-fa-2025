import ConfirmationEmail from "@/emails/confirmation-email";
import InquiryEmail from "@/emails/inquiry-email";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // Get data from contact form
  const data = await request.json();

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    studentName,
    age,
    previousMusicExperience,
  } = data;

  try {
    const response = await resend.batch.send([
      {
        from: "Yuasa Piano Studio <contact@yuasapianostudio.com>",
        to: [email as string],
        subject: "Thank you for contacting Yuasa Piano Studio!",
        replyTo: "Yuasa Piano Studio <yuasapianostudio@gmail.com>",
        react: ConfirmationEmail({
          firstName,
          lastName,
          email,
          phoneNumber,
          addressLine1,
          addressLine2,
          city,
          state,
          zipCode,
          studentName,
          age,
          previousMusicExperience,
        }) as React.ReactElement,
      },
      {
        from: "Website Contact Form <contact@yuasapianostudio.com>",
        to: "yuasapianostudio@gmail.com",
        bcc: "kunal.gala16@gmail.com",
        subject: `New Website Inquiry from ${firstName}`,
        replyTo: email,
        react: InquiryEmail({
          firstName,
          lastName,
          email,
          phoneNumber,
          addressLine1,
          addressLine2,
          city,
          state,
          zipCode,
          studentName,
          age,
          previousMusicExperience,
        }) as React.ReactElement,
      },
    ]);

    console.log(response);

    return Response.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      success: false,
      error,
    });
  }
}
