import React from "react";
import styles from "./rich-text.module.scss";

const RichText = ({ text, className = "" }) => {
  return (
    <div
      className={`${styles.element} ${className}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default RichText;
