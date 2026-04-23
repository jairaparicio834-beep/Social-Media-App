import LoadingScreen from "@/components/LoadingScreen";
import CommentModal from "@/components/modals/CommentModal";
import PostFeed from "@/components/PostFeed";
import Sidebar from "@/components/Sidebar";
import SignUpPrompt from "@/components/SignUpPrompt";
import Widgets from "@/components/Widgets";

export default async function Home() {
  return (
    <>
      <div className="mx-auto text-[#0f1419] min-h-screen 
    max-w-[1400px] flex justify-center
    ">
        <Sidebar />
        <PostFeed />
        <Widgets />
      </div>
      <CommentModal />
      <SignUpPrompt />
      <LoadingScreen />
    </>
  );
}
