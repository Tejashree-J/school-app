import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">SchoolApp</h1>
        <ul className="nav-links">
          <li><Link href="/addSchool">Add School</Link></li>
          <li><Link href="/showSchools">View Schools</Link></li>
        </ul>
      </div>
    </nav>
  );
}
