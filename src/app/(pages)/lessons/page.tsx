import React from "react";

import { client } from "../../../../sanity.client";

// componetns
import PageHeader from "@/components/PageHeader";
import SmallHeading from "@/components/SmallHeading";
import PortableTextComponent from "@/components/PortableTextComponents";
import { PortableText } from "next-sanity";
import MainText from "@/components/MainText";
import Dropdown from "@/components/Dropdown";
import Link from "next/link";

// types

import { PortableTextBlock } from "next-sanity";

type LessonsInfoType = {
  _id: string;
  introductionAndPhilosophy: PortableTextBlock[];
  location: {
    description: PortableTextBlock[];
    options: string[];
  };
  ageAbility: PortableTextBlock[];
  rates: string;
  subjects: {
    description: PortableTextBlock[];
    options: string[];
  };
  pianoLessonsKids: {
    title: string;
    whatsIncluded: string[];
    fourToSix: PortableTextBlock[];
    sevenToTen: PortableTextBlock[];
    elevenToThirteen: PortableTextBlock[];
    fourteenPlus: PortableTextBlock[];
  };
  pianoLessonsAdults: {
    title: string;
    whatsIncluded: string[];
    beginner: PortableTextBlock[];
    intermediate: PortableTextBlock[];
    advanced: PortableTextBlock[];
  };
};

const LessonsPage = async () => {
  const lessonsInfo = await client.fetch<LessonsInfoType>(`
    *[_type == 'lessonsInfo'][0]{
            _id,
            introductionAndPhilosophy,
            location {
              description,
              options
            },
            ageAbility,
            rates,
            subjects {
              description,
              options
            },
            pianoLessonsKids {
              title,
              whatsIncluded,
              fourToSix,
              sevenToTen,
              elevenToThirteen,
              fourteenPlus
            },
            pianoLessonsAdults {
              title,
              whatsIncluded,
              beginner,
              intermediate,
              advanced
            }
        }`);

  return (
    <main className="p-8">
      <PageHeader>Lessons</PageHeader>

      <div className="py-8 max-w-6xl mx-auto space-y-8">
        <div>
          <SmallHeading>Introduction and Philosophy</SmallHeading>
          <PortableText
            value={lessonsInfo.introductionAndPhilosophy}
            components={PortableTextComponent}
          ></PortableText>
        </div>
        <div>
          <SmallHeading>Location</SmallHeading>
          <PortableText
            value={lessonsInfo.location.description}
            components={PortableTextComponent}
          ></PortableText>
          <ul className="text-textColor font-light ml-8">
            {lessonsInfo.location.options.map((neighborhood, index) => (
              <li key={index}>{neighborhood}</li>
            ))}
          </ul>
        </div>
        <div>
          <SmallHeading>Age & Ability</SmallHeading>
          <PortableText
            value={lessonsInfo.ageAbility}
            components={PortableTextComponent}
          ></PortableText>
        </div>
        <div>
          <SmallHeading>Rates</SmallHeading>
          <MainText>
            Please visit the <Link href={"/rates"}>Rates</Link> page for tuition
            rates and payment policies.
          </MainText>
        </div>
        <div>
          <SmallHeading>Subjects</SmallHeading>
          <ul className="text-textColor font-light ml-8">
            {lessonsInfo.subjects.options.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
          <PortableText
            value={lessonsInfo.subjects.description}
            components={PortableTextComponent}
          ></PortableText>
        </div>
      </div>
      <PageHeader id="#piano-lessons-for-kids">
        {lessonsInfo.pianoLessonsKids.title}
      </PageHeader>
      <section className="py-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <SmallHeading>What&apos;s Included</SmallHeading>
          <ul className="text-textColor font-light">
            {lessonsInfo.pianoLessonsKids.whatsIncluded.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <SmallHeading>Sample Curriculum</SmallHeading>
        <Dropdown
          options={[
            {
              title: "*4 to 6 year olds",
              content: (
                <PortableText
                  value={lessonsInfo.pianoLessonsKids.fourToSix}
                  components={PortableTextComponent}
                ></PortableText>
              ),
            },
            {
              title: "7 to 10 year olds",
              content: (
                <PortableText
                  value={lessonsInfo.pianoLessonsKids.sevenToTen}
                  components={PortableTextComponent}
                ></PortableText>
              ),
            },
            {
              title: "11 to 13 year olds",
              content: (
                <PortableText
                  value={lessonsInfo.pianoLessonsKids.elevenToThirteen}
                  components={PortableTextComponent}
                ></PortableText>
              ),
            },
            {
              title: "14+",
              content: (
                <PortableText
                  value={lessonsInfo.pianoLessonsKids.fourteenPlus}
                  components={PortableTextComponent}
                ></PortableText>
              ),
            },
          ]}
        />
        <MainText className="sm:pt-8">
          * I accept students as young as 4 y.o.. However, the optimal starting
          age varies widely for each individual child, depending on their
          personality, ability to focus, and mental and physical maturity. If
          they know their ABCs, can concentrate for 30 minutes, enjoy music and
          are interested in the piano, then they are probably ready! Book an{" "}
          <Link href={"/contact"} className="text-linkColor">
            introductory lesson
          </Link>{" "}
          or contact me for more information.
        </MainText>
      </section>
      <PageHeader id="#piano-lessons-for-adults">
        {lessonsInfo.pianoLessonsAdults.title}
      </PageHeader>
      <section className="py-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <SmallHeading>What&apos;s Included</SmallHeading>
          <ul className="text-textColor font-light">
            {lessonsInfo.pianoLessonsAdults.whatsIncluded.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <Dropdown
          options={[
            {
              title: "Beginner",
              content: (
                <PortableText
                  value={lessonsInfo.pianoLessonsAdults.beginner}
                  components={PortableTextComponent}
                ></PortableText>
              ),
            },
            {
              title: "Intermediate",
              content: (
                <PortableText
                  value={lessonsInfo.pianoLessonsAdults.intermediate}
                  components={PortableTextComponent}
                ></PortableText>
              ),
            },
            {
              title: "Advanced",
              content: (
                <PortableText
                  value={lessonsInfo.pianoLessonsAdults.advanced}
                  components={PortableTextComponent}
                ></PortableText>
              ),
            },
          ]}
        ></Dropdown>
      </section>
    </main>
  );
};

export default LessonsPage;
