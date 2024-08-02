import Image from "next/image";
import logo from "../Assets/logo.png";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import { BsWhatsapp } from "react-icons/bs";

const Header = dynamic(() => import("./components/Header"), {
  ssr: false,
});
interface TileProps {
  description: string;
  title: string;
  icon: string;
}

export default function Home() {
  return (
    <main className="">
      <Head>
        <title>Regen-DAO</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="relative isolate px-8 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl pt-20 sm:py-48 lg:py-[80px]">
          <div className="justify-center text-center">
            <h1 className="pb-10  text-4xl font-bold tracking-tight text-green-700 sm:text-6xl md:pt-20">
             Supply Chain Management
            </h1>
            <span className="glow pb-20 text-2xl md:text-3xl">
              Building the farmers for the next generation. Its an DAO to help
              the farmers with the supplychain management, getting identity and
              apply for the loans.
            </span>
            <Link href="/ApplyLoan">
              <button className="btn-grad3 mt-15 md:mt-8 ">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
      <a
        href="https://wa.me/918072105077"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsWhatsapp className="fa fa-whatsapp mt-2" />
      </a>
      
    </main>
  );
}
