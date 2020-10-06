import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getRepos } from "../store/index";

export default () => {
  const dispatch = useDispatch();
  const profileData = useSelector((appState) => appState.profile);
  const repoData = useSelector((appState) => appState.repos);
  console.log(profileData);
  console.log(repoData);
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getRepos());
  }, []);

  function languageColor() {
    if (repoData.language === "JavaScript") {
      return "red";
    } else if (repoData.language === "HTML") {
      return "yellow";
    } else if (repoData.language === "CSS") {
      return "green";
    } else {
      return null;
    }
  }

  return (
    <div>
      <hr></hr>
      <div id="page-grid">
        <div id="sidebar">
          <img id="profile-pic" src={profileData.avatar_url}></img>
          <p id="name">{profileData.name}</p>
          <p id="username">{profileData.login}</p>
          <button id="follow">Follow</button>
          <button id="dots">• • •</button>
          <p id="location">
            <i class="fas fa-map-marker-alt"></i> {profileData.location}
          </p>
          <p id="blog">
            <i class="fas fa-blog"></i>{" "}
            {profileData.blog ? profileData.blog : "Blog - N/A"}
          </p>
          <p id="email">
            <i class="fas fa-envelope-open-text"></i>{" "}
            {profileData.email ? profileData.email : "Email - N/A"}
          </p>
          <p id="website">
            <i class="fas fa-link"></i> {profileData.html_url}
          </p>
        </div>
        <div id="main-content">
          <div id="navbar">
            <a className="nav-option">
              <i class="fas fa-book-open"></i> Overview
            </a>
            <a id="nav-repos" className="nav-option">
              <i class="fas fa-hdd"></i> Repositories{" "}
              <span id="repo-number">{repoData.length}</span>
            </a>
            <a className="nav-option">
              <i class="fa fa-file" aria-hidden="true"></i> Projects
            </a>
            <a className="nav-option">
              <i class="fas fa-box"></i> Packages
            </a>
          </div>
          <div id="search-row">
            <input
              id="search"
              type="text"
              placeholder="Find a repository..."
            ></input>
            <select className="select">
              <option value="" disabled selected>
                Type: All
              </option>
              <option value="sources">Sources</option>
              <option value="forks">Forks</option>
              <option value="archived">Archived</option>
              <option value="mirrors">Mirrors</option>
            </select>
            <select className="select">
              <option value="" disabled selected>
                Language: All
              </option>
              <option value="all">All</option>
            </select>
          </div>
          <ul id="repo-list">
            {repoData.map((item) => (
              <li className="repo" key={item.id}>
                <div className="repo-flex">
                  <a className="repo-name" target="_blank" href={item.html_url}>
                    {item.name}
                  </a>
                  <button className="star">
                    <i class="fas fa-star"></i> Star
                  </button>
                </div>
                <div className="lang-flex">
                  {item.language ? (
                    <p
                      id="lang-dot"
                      className={
                        item.language === "HTML"
                          ? "red"
                          : item.language === "JavaScript"
                          ? "yellow"
                          : item.language === "CSS"
                          ? "purple"
                          : null
                      }
                    >
                      •
                    </p>
                  ) : null}
                  <p className="language">{item.language}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
