import React from "react";
import "./style.css";

const Videos = ({ soccerVideos }) => {


  return (
    <div className="main-container">
      {soccerVideos
        ? soccerVideos.map((soccerVideo) => {
            return (
              <div className="card-container">
                <a href={soccerVideo.matchviewUrl} target="_blank" rel="noreferrer" >
                  <img className="img"
                    src={soccerVideo.thumbnail}
                    alt="pic"
                    height="220"
                    width="250"
                  />
                </a>
                <br />
                <p className="title">{soccerVideo.title}</p>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default Videos;
