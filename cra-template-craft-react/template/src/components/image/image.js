import React from "react";
import styles from "./image.module.scss";

const Image = ({
  url,
  placeholderImage,
  src,
  srcset,
  srcsetWebp,
  extension,
  className = "",
  alt,
  title,
  ...rest
}) => {
  const isSvg = extension === "svg";
  if (isSvg) {
    return (
      <img
        data-src={url}
        src={placeholderImage}
        className="lazyload"
        alt={alt || title}
      />
    );
  }
  return (
    <picture className={`${styles.element} ${className}`}>
      <Source srcset={srcset} srcsetWebp={!isSvg && srcsetWebp} />
      <Img
        {...rest}
        placeholderImage={placeholderImage}
        src={src}
        srcset={!isSvg && srcset}
        alt={alt || title}
      />
    </picture>
  );
};

export const Source = ({ srcset, srcsetWebp, media }) => {
  return (
    <>
      {srcsetWebp && (
        <source data-srcset={srcsetWebp} media={media} type={"image/webp"} />
      )}
      <source data-srcset={srcset} media={media} type={"image/jpeg"} />
    </>
  );
};

export const Img = ({ src, alt, srcset, placeholderImage, title }) => {
  return (
    <img
      alt={alt || title}
      className="lazyload"
      src={placeholderImage}
      data-src={src || `//placehold.it/100x100`}
      data-srcset={srcset}
      sizes="100vw" //why?
    />
  );
};

export default Image;
