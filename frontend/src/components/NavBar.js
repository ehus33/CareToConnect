import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/schedule">Schedule</Link></li>
                <li><Link to="/translate">Translate</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
