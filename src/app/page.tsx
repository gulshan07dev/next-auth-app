import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen overflow-x-hidden flex-col gap-10 items-center justify-between md:p-20 px-2 py-20">
      {/* header */}
      <header className="relative flex flex-col md:gap-5 gap-7 place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="md:text-5xl text-4xl text-orange-500 font-semibold text-center">
          Welcome To My
        </h1>
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h2 className="md:text-5xl text-4xl text-yellow-500 font-semibold text-center">
          <span className="text-purple-500">Authentication</span> App
        </h2>
      </header>

      {/* project features */}
      <div className="md:p-10 md:py-6 p-5 flex flex-col gap-3  rounded-l dark:bg-neutral-800/30 md:w-[600px] w-[90%]">
        <h2 className="text-3xl text-slate-50 font-semibold">Features:-</h2>
        <ul className="list-disc text-base text-slate-200 font-medium pl-2.5">
          <li>Login</li>
          <li>Signup</li>
          <li>Email Verification</li>
          <li>Rset Password</li>
          <li>Change Password</li>
          <li>Veiw or edit profile</li>
        </ul>
      </div>

      {/*login or signup option  */}
      <div className="w-[100%] flex md:gap-7 gap-2.5 justify-center items-center text-center">
        <Link
          href="/login"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 bg-gray-900 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 md:w-[300px] w-[45%] flex justify-center items-center"
        >
          <h2 className={`md:text-2xl text-xl font-semibold`}>
            Login{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </Link>
        <Link
          href="/signup"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 bg-gray-900 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 md:w-[300px] w-[45%] flex justify-center items-center"
        >
          <h2 className={`md:text-2xl text-xl font-semibold`}>
            Signup{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </Link>
      </div>
    </main>
  );
}
