import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Table from '@/components/table';
import TablePlaceholder from '@/components/table-placeholder';
import ExpandingArrow from '@/components/expanding-arrow';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      <Link
        href="https://vercel.com/templates/next.js/postgres-drizzle"
        className="flex px-10 py-2 mt-20 space-x-1 text-sm font-medium text-gray-600 transition-all rounded-full shadow-sm group sm:mt-0 bg-white/30 ring-1 ring-gray-900/5 hover:shadow-lg active:shadow-sm"
      >
        <p>Deploy your own to Vercel</p>
        <ExpandingArrow />
      </Link>
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#4b4b4b] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        SingleStore on Vercel
      </h1>
      <Suspense fallback={<TablePlaceholder />}>
        <Table />
      </Suspense>
      <p className="w-full max-w-lg mt-6 font-light text-center text-gray-600">
        <Link
          href="https://vercel.com/integrations/singlestoredb-cloud"
          className="font-medium underline transition-colors underline-offset-4 hover:text-black"
        >
          Vercel SingleStore
        </Link>{' '}
        demo with{' '}
        <Link
          href="https://github.com/drizzle-team/drizzle-orm"
          className="font-medium underline transition-colors underline-offset-4 hover:text-black"
        >
          Drizzle
        </Link>{' '}
        as the ORM. <br /> Built with{' '}
        <Link
          href="https://nextjs.org/docs"
          className="font-medium underline transition-colors underline-offset-4 hover:text-black"
        >
          Next.js App Router
        </Link>
        .
      </p>

      <div className="flex justify-center w-full max-w-xl pt-10 mt-10 space-x-5 text-gray-600 border-t border-gray-300">
        <Link
          href="https://postgres-prisma.vercel.app/"
          className="font-medium underline transition-colors underline-offset-4 hover:text-black"
        >
          Prisma
        </Link>
        <Link
          href="https://postgres-starter.vercel.app/"
          className="font-medium underline transition-colors underline-offset-4 hover:text-black"
        >
          Starter
        </Link>
        <Link
          href="https://postgres-kysely.vercel.app/"
          className="font-medium underline transition-colors underline-offset-4 hover:text-black"
        >
          Kysely
        </Link>
      </div>

      <div className="flex justify-between w-full px-20 py-10 sm:absolute sm:bottom-0">
        <Link href="https://vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <Link
          href="https://github.com/vercel/examples/tree/main/storage/postgres-drizzle"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
  );
}
