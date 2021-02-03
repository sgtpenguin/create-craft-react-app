import React from "react";

//content blocks
import richText from "./rich-text-block";
/* import-cursor */

const components = {
  richText,
  /* object-cursor */
};

const Blocks = ({ blocks, entry }) => {
  return blocks.map((block) => {
    const Comp = components[block.typeHandle];
    if (!Comp) {
      console.warn(`Missing block type ${block.__typename}`);
      return null;
    }
    return <Comp key={block.id} {...block} entry={entry} />;
  });
};
export default Blocks;
