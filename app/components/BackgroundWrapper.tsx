"use client";
import dynamic from "next/dynamic";

const ClientBackgroundWrapperNoSSR = dynamic(
  () => import("./ClientBackgroundWrapper"),
  { ssr: false }
);

export default function BackgroundWrapper() {
  return <ClientBackgroundWrapperNoSSR />;
}
