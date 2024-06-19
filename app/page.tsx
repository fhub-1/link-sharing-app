import Image from "next/image";
import ProfileLinksPage from "./components/profile-links";
import ManageLinks from "./(pages)/manage/page";
// import ManageLinksPage from "./components/manage-links";

export default function Home() {
  return (
    <main>
      <ManageLinks />
    </main>
  );
}
