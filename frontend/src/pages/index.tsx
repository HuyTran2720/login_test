import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main >
        <Link href={"signup"}>
          <Button>
            Sign Up
          </Button>
        </Link>
        <Link href={"login"}>
          <Button>
            Login
          </Button>
        </Link>
      </main>
      <footer>

      </footer>
    </div>
  );
}
