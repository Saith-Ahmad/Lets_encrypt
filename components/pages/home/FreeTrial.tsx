"use client";
import { TextAnimate } from "@/components/magicui/text-animate";
import Link from "next/link";

export default function GetStarted() {
  return (
    <section
      className="py-20 bg-white relative overflow-hidden"
      id="get-started"
    >
    

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <TextAnimate
            animation="blurIn"
            by="word"
            duration={0.6}
            as="h2"
            className="text-2xl md:text-4xl font-bold text-primary"
          >
            Start Encrypting with Confidence
          </TextAnimate>

      

          <p className="text-gray-600 mt-3">
            Experience seamless encryption without any setup hassles. Sign up,
            upload, encrypt, and safeguard your text and files  all in one
            secure dashboard. Your privacy deserves the best protection, and
            <strong> Let’s Encrypt </strong> makes it effortless.
          </p>
        </div>

        {/* Content Grid + Image */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {/* Left Grid - Benefits */}
          <div className="md:max-w-[50%] grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-6 shadow-md rounded-xl bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <h3 className="font-semibold text-lg mb-2">Free Trial Access</h3>
              <p className="text-gray-600 text-sm">
                Get started instantly — no credit card required. Test every
                feature of Let’s Encrypt before committing.
              </p>
              <Link
                href="/dashboard"
                className="text-accent text-sm font-medium mt-2 inline-block"
              >
                Sign Up Now →
              </Link>
            </div>

            {/* Card 2 */}
            <div className="p-6 shadow-md rounded-xl bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <h3 className="font-semibold text-lg mb-2">All-in-One Security</h3>
              <p className="text-gray-600 text-sm">
                Encrypt text, secure files, and manage encryption keys — all
                inside one beautifully simple interface.
              </p>
              <Link
                href="/dashboard"
                className="text-accent text-sm font-medium mt-2 inline-block"
              >
                Explore Features →
              </Link>
            </div>

            {/* Card 3 */}
            <div className="p-6 shadow-md rounded-xl bg-white border border-gray-200 md:col-span-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <h3 className="font-semibold text-lg mb-2">Privacy You Control</h3>
              <p className="text-gray-600 text-sm">
                You own your data — we never store plain text or unencrypted
                content. Your files, your keys, your privacy.
              </p>
              <Link
                href="/dashboard"
                className="text-accent text-sm font-medium mt-2 inline-block"
              >
                Go to Dashboard →
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:max-w-[50%] justify-center overflow-hidden rounded-md flex">
            <img
              src="/assets/cta.png"
              alt="Start encrypting illustration"
              className="rounded-xl max-w-[300px] w-full transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
