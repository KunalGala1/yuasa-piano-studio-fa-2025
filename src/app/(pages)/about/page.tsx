import React from "react";

import { client } from "../../../../sanity.client";

// components
import PageHeader from "@/components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { PortableText } from "next-sanity";
import PortableTextComponent from "@/components/PortableTextComponents";
import SmallHeading from "@/components/SmallHeading";

// images
import aboutPic from "../../../../public/files/about.jpg";

const ABoutPage = async () => {
  // Get profile
  const profile = await client.fetch(
    `*[_type == 'profile'][0]{_id, name, headline, image {alt, "image": asset->url}, shortBio, fullBio, education {title, details}, teaching {title, details}}`
  );

  return (
    <section className="p-8">
      <PageHeader>About</PageHeader>

      <div className="flex flex-col justify-center items-center py-4 text-center my-8">
        <blockquote className="italic font-light">
          &ldquo;She is a natural born teacher, not to mention an excellent
          piano player.&rdquo;
        </blockquote>
        <div className="flex justify-center items-center text-amber-200 w-[150px] mt-4">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
        <div>
          <div>Ephraim B., YPS student</div>
        </div>
      </div>
      <div className="py-4 max-w-6xl mx-auto flex flex-col gap-4">
        <div>
          <Image
            src={aboutPic}
            alt="A headshot of Aya wearing a yellow dress at sunset"
            width={500}
            height={500}
            unoptimized={true}
            quality={100}
            priority={true}
            className="w-full mb-4 md:float-left md:mr-8 md:w-1/2 rounded shadow"
          ></Image>
          <div className="space-y-8">
            <PortableText
              value={profile.fullBio}
              components={PortableTextComponent}
            />
            <div>
              <SmallHeading>{profile.education.title}</SmallHeading>
              <PortableText
                value={profile.education.details}
                components={PortableTextComponent}
              />
            </div>
            <div>
              <SmallHeading>{profile.teaching.title}</SmallHeading>
              <PortableText
                value={profile.teaching.details}
                components={PortableTextComponent}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ABoutPage;
