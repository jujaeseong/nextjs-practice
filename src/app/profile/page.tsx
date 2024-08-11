import db from "@/lib/db";
import getSession from "@/lib/session";
import { FireIcon } from "@heroicons/react/24/solid";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    return user;
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/log-in");
  };

  return (
    <div className="py-20">
      <div className="flex flex-col items-center max-w-md mx-auto gap-5">
        <span>
          <FireIcon className="text-red-400 size-12" />
        </span>
        <h1 className="font-bold text-xl">Email : {user?.email}</h1>
        <h1 className="font-bold text-xl">Username : {user?.username}</h1>
        <form
          action={logOut}
          className="flex items-center h-10 gap-2 px-3 bg-emerald-500 rounded-xl animate-popIn"
        >
          <button>Log out</button>
        </form>
      </div>
    </div>
  );
}
