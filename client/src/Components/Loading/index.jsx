import React from "react";
import { LinearProgress } from "@rmwc/linear-progress";
import Style from "./style.css";

export function Loading() {
  return <LinearProgress className={Style.loading} />;
}
