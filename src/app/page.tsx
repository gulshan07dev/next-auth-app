import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen overflow-x-hidden flex-col gap-10 items-center justify-between md:p-20 px-2 py-20">
      {/* header */}
      <header className="relative flex flex-col md:gap-5 gap-7 place-items-center before:absolute before:h-[100px] before:w-[400px]  before:rounded-[20%] before:bg-gradient-radial before:from-[#bbb4ff] before:to-transparent before:backdrop-blur-sm before:content-[''] after:absolute after:top-[50%] after:-z-[1] after:h-[70px] after:w-[500px] after:translate-x-1/3 after:translate-y-1/5  after:bg-gradient-conic after:from-sky-100 after:via-blue-100 after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-300 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#3769ff]  before:lg:h-[300px] z-[1]">
        <h1 className="md:text-5xl bg-transparent  text-4xl relative z-[3] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-[#1000a5]   to-[#0f0096] font-semibold text-center">
          Welcome To My
        </h1>
        <Image
          className="relative z-[3] invert-[1] drop-shadow-[0_0_0.3rem_#ffffff70] "
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h2 className="md:text-5xl text-4xl relative z-[3] text-red-500 font-semibold text-center">
          <span className="text-gray-900">Authentication</span> App
        </h2>
      </header>

      {/* project features */}
      <div className="md:p-10 md:py-6 p-5 flex flex-col gap-3  rounded-l dark:bg-neutral-900/5 shadow-sm backdrop-blur-md md:w-[600px] w-[90%]">
        <h2 className="text-3xl text-gray-700 font-semibold">Features:-</h2>
        <ul className="list-disc text-lg text-gray-700 font-medium pl-2.5">
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
