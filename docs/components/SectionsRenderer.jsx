/* eslint-disable */
import React from "react";
// Import default implementation from react-styleguidist using the full path
//import DefaultSectionsRenderer from "react-styleguidist/lib/rsg-components/Sections/SectionsRenderer.js";


export function SectionsRenderer(props: Props) {
  const { children, activeSection } = props;
  console.log('Children', children);
  console.log('active child', activeSection)
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

type Props = {
  children: Node,
  activeSection: number
};

export default SectionsRenderer;
