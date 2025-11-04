// next
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { client } from "../../../sanity.client";

import { PortableText } from "@portabletext/react";

// images
import heroPic from "../../../public/files/hero.jpg";
import portraitSakura from "../../../public/files/portrait-sakura.jpg";

// components
import PortableTextComponent from "../../components/PortableTextComponents";
import Header from "../../components/Header";
import Button from "../../components/Button";
import MainText from "../../components/MainText";
import TrifoldCard from "../../components/TrifoldCard";
import LearnMoreCard from "../../components/LearnMoreCard";
import LearnMoreList from "../../components/LearnMoreList";
import Testimonial from "../../components/Testimonial";

// types
type Testemonial = {
  _id: string;
  quote: string;
  author: string;
};

const HomePage = async () => {
  // Get profile
  const profile = await client.fetch(
    `*[_type == 'profile'][0]{_id, name, headline, image {alt, "image": asset->url}, shortBio, fullBio, education {title, details}, teaching {title, details}}`
  );

  const testimonials = await client.fetch<Testemonial[]>(
    `*[_type == 'testimonial']{_id, quote, author}`
  );

  return (
    <main className="sm:space-y-16 space-y-4">
      {/* Hero */}
      <section className="relative w-full h-[500px] p-8">
        <Image
          src={heroPic}
          alt="Hero Pic"
          unoptimized={true}
          priority={true}
          quality={100}
          placeholder="blur"
          className="absolute top-0 left-0 w-full h-full object-cover sm:object-left object-[25%] sm:translate-x-[25%]"
        ></Image>
        <div className="bg-linearGradient w-full h-full absolute top-0 left-0"></div>
        {/* TEXT CONTENT */}
        <div className="w-full h-full relative text-white flex flex-col justify-center items-start gap-16 max-w-6xl mx-auto">
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl drop-shadow">
              PIANO LESSONS IN NYC
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl drop-shadow">
              With AYA YUASA
            </h2>
          </div>
          <div className="flex gap-4">
            <Link href={"/lessons"}>
              <Button theme="light">Lessons</Button>
            </Link>
            <Link href={"/contact"}>
              <Button theme="dark">Contact</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Introduction */}
      <section className="p-8">
        <div className="max-w-6xl mx-auto">
          <MainText>
            Welcome to the Yuasa Piano Studio website! I offer in-home piano
            lessons in Manhattan, Queens, and Brooklyn. Read my{" "}
            <Link href="/lessons" className="text-linkColor">
              teaching philosophy
            </Link>
            , visit the{" "}
            <Link href="/rates" className="text-linkColor">
              rates page
            </Link>
            , or schedule a{" "}
            <Link href="/contact" className="text-linkColor">
              trial lesson
            </Link>
            . I look forward to hearing from you!
          </MainText>
        </div>
      </section>
      {/* Trifold */}
      <section className="p-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <TrifoldCard
            image={{
              src: "piano",
              height: 50,
              width: 50,
              alt: "piano logo",
            }}
            title="Fun Repertoire"
            animation="hover:animate-wiggle"
          >
            Lessons include pop, rock, blues, folk, jazz, movie and video game
            music, while developing keyboard fluency through standard classical
            repertoire.
          </TrifoldCard>
          <TrifoldCard
            image={{
              src: "house",
              height: 50,
              width: 50,
              alt: "house logo",
            }}
            title="In-Home Lessons"
            animation="hover:animate-shake"
          >
            Lessons take place in the comfort and convenience of your own home.
          </TrifoldCard>
          <TrifoldCard
            image={{
              src: "trial",
              height: 50,
              width: 50,
              alt: "trial logo",
            }}
            title="Trial"
            animation="hover:animate-throb"
          >
            All prospective students receive a 30 minute trial lesson. Visit the{" "}
            <Link href={"/contact"} className="text-linkColor">
              Contact page
            </Link>{" "}
            to learn more and sign-up!
          </TrifoldCard>
        </div>
      </section>
      {/* More information for kids or adults */}
      <section className="flex flex-col gap-16 p-8">
        <LearnMoreCard
          title={"Piano Lessons for Kids"}
          link={"/lessons#piano-lessons-for-kids"}
        >
          <LearnMoreList>
            <li>
              Weekly 30, 45 or 60 minute lessons in the comfort and convenience
              of your own home.
            </li>
            <li>
              Comprehensive instruction in music theory, sight-reading, chord
              charts, technique and ear training.
            </li>
            <li>
              Fun repertoire that includes classical, jazz, folk, rock and pop
              music.
            </li>
            <li>
              Other activities such as composing, arranging and music
              production.
            </li>
          </LearnMoreList>
        </LearnMoreCard>
        <LearnMoreCard
          title={"Piano Lessons for Adults"}
          link={"/lessons#piano-lessons-for-adults"}
        >
          <LearnMoreList>
            <li>
              Weekly 45 or 60 minute lessons in the comfort and convenience of
              your own home.
            </li>
            <li>
              Comprehensive instruction in music theory, sight-reading, chord
              charts technique and ear training.
            </li>
            <li>
              Inspiring repertoire, clear and informative feedback, and
              easy-to-follow assignments.
            </li>
            <li>
              Virtual Only - Flexible, week to week scheduling to accommodate
              busy schedules.
            </li>
          </LearnMoreList>
        </LearnMoreCard>
      </section>
      {/* Short Bio */}
      <section className="bg-linearGradient2 p-8">
        <div className="flex flex-col-reverse md:flex-row gap-16 max-w-6xl mx-auto">
          <div className="md:w-2/5">
            <Image
              src={portraitSakura}
              width={100}
              height={400}
              alt={"Portrait image with sakura in background"}
              className="object-cover object-[80%,50%] w-full h-full rounded"
              unoptimized={true}
              quality={100}
              priority={true}
              placeholder="blur"
            ></Image>
          </div>
          {profile && (
            <div className="md:w-3/5 space-y-8">
              <PortableText
                value={profile.shortBio}
                components={PortableTextComponent}
              />
            </div>
          )}
        </div>
      </section>
      {/* Testimonials */}
      <section className="p-8">
        <div className="max-w-6xl mx-auto">
          {testimonials &&
            testimonials.map((testimonial) => (
              <Testimonial author={testimonial.author} key={testimonial.author}>
                {testimonial.quote}
              </Testimonial>
            ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
