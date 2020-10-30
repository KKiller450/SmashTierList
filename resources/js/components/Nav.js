import React from "react";
import "../../css/app.css";
import { Link } from "react-router-dom";

function About() {
    return (
        <nav>
            <h3>Smash Players</h3>
            <ul className="nav-links about">
                <Link className="nav-style" to="/about">
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    );
}

export default About;
