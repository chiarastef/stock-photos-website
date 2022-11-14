import React from "react";

const Photo = (props) => {
  return (
    <article className="photo">
      <img
        src={props.photo.urls.regular}
        alt={props.photo.description || "photo"}
      />
      <div className="photo-info">
        <div>
          <h4>{props.photo.user.name}</h4>
          <p>{props.photo.likes} likes</p>
        </div>
        <a href={props.photo.user.portfolio_url}>
          <img
            src={props.photo.user.profile_image.small}
            alt={props.photo.user.name}
            className="user-img"
          />
        </a>
      </div>
    </article>
  );
};

export default Photo;
