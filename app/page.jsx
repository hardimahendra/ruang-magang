import DashboardApp from "./_components/DashboardApp";
import { internships, reports } from "./_data/demo-data";

export default function Home() {
  return <DashboardApp internships={internships} reports={reports} />;
}
