import React from "react";
import { Link } from "react-router-dom";

import Email from "./icons/envelope-solid.png";
import Phone from "./icons/phone-solid.png";
import Facebook from "./icons/facebook-f-brands.png";
import Instagram from "./icons/instagram-brands.png";
import Twitter from "./icons/twitter-brands.png";

export default function TopNav() {
  return (
    <div className="top-nav">
      <div>
        <ul className="redes">
          <li>
            <a href="mailto:info@tiendachayito.com">
              <img src={Email} alt="" width="15" />
            </a>
          </li>
          <li>
            <a href="mailto:info@tiendachayito.com">
              <span className="info">info@tiendachayito.com</span>
            </a>
          </li>
          <li>
            <Link to="#!">
              <img src={Phone} alt="" width="15" />
              <span className="phone">2445-4858 | 8864-6924</span>
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <ul className="redes">
          <li>
            <a
              href="https://fb.com/templatemo"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Facebook} alt="" width="12" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Instagram} alt="" width="20" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <img src={Twitter} alt="" width="20" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
