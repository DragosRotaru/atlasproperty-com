import React, { Component } from "react";
import Style from "./style.css";

const SummaryOptions = {
  underline: ["no-underline", "underline"],
  align: ["left", "right", "center"],
}; // TODO Replace

export function Summary(props: {
  title?: string,
  description?: string,
  keywords?: Array<string>,
  align?: string,
  className?: string,
}) {
  const { title, description, align, className, keywords } = props;
  return (
    <div className={[Style.content, Style[align], className].join(" ")}>
      <h2>{title}</h2>
      <br />
      {title.length < 30 ? <h4>{description}</h4> : ""}
      <br />
      <p>
        {keywords.map(keyword => (
          <span key={keyword}>#{keyword} </span>
        ))}
      </p>
    </div>
  );
}
Summary.defaultProps = {
  title: "",
  description: "",
  keywords: [],
  align: "center",
  className: "",
};
