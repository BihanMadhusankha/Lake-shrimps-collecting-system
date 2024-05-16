import IcoMoon, { IconProps } from "react-icomoon";
import * as iconSet from "./selection.json";
import React from "react";

const Icon = (props: IconProps) => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;