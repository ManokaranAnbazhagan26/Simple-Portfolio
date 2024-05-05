import React, { useEffect, useState } from "react";
import "../css/SocialStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"; // Correct import for faEnvelope


const socialProfilesData = [
  {
    "network": "linkedin",
    "href": "https://www.linkedin.com/in/saurabhhitendrapatel/"
  },
  {
    "network": "github",
    "href": "https://github.com/saurabhp94/"
  },
  {
    "network": "email",
    "href": "mailto:contactsaurabhpatel@gmail.com"
  }
];

function Socialicons() {
  const [socialProfiles, setSocialProfiles] = useState([]);

  useEffect(() => {
    setSocialProfiles(socialProfilesData); // Use the defined data directly
  }, []);

  const icons = {
    "github": faGithub,
    "linkedin": faLinkedin,
    "email": faEnvelope
  };

  return (
    <div className="stick_follow_icon">
      <ul>
        {socialProfiles.map((profile) => (
          <li key={profile.network}>
            <a href={profile.href}>
              <FontAwesomeIcon icon={icons[profile.network]} />
            </a>
          </li>
        ))}
      </ul>
      <p>Follow Me ⎯⎯⎯⎯</p>
    </div>
  );
};

export default Socialicons;