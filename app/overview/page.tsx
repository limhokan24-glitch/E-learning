
import { redirect } from "next/navigation";
import Overview from "@/components/Dashboard/overview";


export default async function OverviewPage() {


//   if (!session) {
//     redirect("/login");
//   }

  return <Overview user='hokan' />;
}
