import { Link } from "@heroui/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://drive.google.com/file/d/14TGv7xaQYqWDL34PVbIOsgWGTmDRoGvz/view?usp=sharing"
          title="heroui.com homepage"
        >
          <span className="text-default-600">Резюме</span>
          <p className="text-primary">клік</p>
        </Link>
      </footer>
    </div>
  );
}
