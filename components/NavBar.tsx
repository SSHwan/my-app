import { EmojiHappyIcon } from "@heroicons/react/outline";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="bg-gray-700 flex justify-center text-white py-5 mb-7">
      <div className="flex items-center gap-8 w-3/4">
        <Link href="/window">
          <EmojiHappyIcon className="w-8 h-8 cursor-pointer" />
        </Link>
        <Link href="/window">
          <div className="cursor-pointer hover:font-bold">경산창호</div>
        </Link>
        <Link href="/todo">
          <div className="cursor-pointer hover:font-bold">To Do List</div>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar;