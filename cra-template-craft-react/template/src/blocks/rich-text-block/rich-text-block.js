import React from "react";
import styles from "./rich-text-block.module.scss";
import RichText from "components/rich-text";

const RichTextBlock = ({ richText }) => {
  return <RichText text={richText} />;
};

export default RichTextBlock;
