import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFoundPage() {
  return <><Seo title="Page Not Found | Nexus Education" description="Return to the Nexus Education homepage or explore the course catalogue." /><section className="not-found container"><span className="not-found-code">404</span><Search size={42} /><h1>That page could not be found.</h1><p>The link may have changed, or the page may not exist. Start again from the homepage or search the current course catalogue.</p><div className="button-row"><Link className="btn btn-primary" to="/"><ArrowLeft size={17} /> Back Home</Link><Link className="btn btn-secondary" to="/courses">Explore Courses</Link></div></section></>;
}
