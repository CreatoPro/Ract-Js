import Tabs from "@/app/components/Tabs";
import { useRouter } from "next/navigation";

const handleClick = () => {
  const router = useRouter();
  const data = { name: "John", age: 30 }; // Your data object
  router.push({ pathname: "/page-b", query: data });
};
export default function Home() {
  return <button onClick={handleClick}>Send data to Page B</button>;
}
