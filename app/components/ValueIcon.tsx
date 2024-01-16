import { FunctionComponent } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  CodeBracketIcon,
  Squares2X2Icon,
  CubeIcon,
  DocumentTextIcon,
  NoSymbolIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import { JSONValueType } from "@jsonhero/json-infer-types";
import { colorForTypeName } from "../utilities/colors";
import { StringIcon } from "./Icons/StringIcon";

type ValueIconProps = {
  type: JSONValueType;
  size?: ValueIconSize;
  monochrome?: boolean;
};

export enum ValueIconSize {
  Small,
  Medium,
}

export const ValueIcon: FunctionComponent<ValueIconProps> = ({
  type,
  size = ValueIconSize.Small,
  monochrome = false,
}) => {
  let classes = monochrome ? `text-slate-300` : colorForTypeName(type.name);
  switch (size) {
    case ValueIconSize.Small:
      classes += " h-4 w-4";
      break;
    case ValueIconSize.Medium:
      classes += " h-6 w-6";
      break;
  }

  switch (type.name) {
    case "object": {
      return <CubeIcon className={classes} />;
    }
    case "array": {
      return <Squares2X2Icon className={classes} />;
    }
    case "null": {
      return <NoSymbolIcon className={classes} />;
    }
    case "bool": {
      return <CheckCircleIcon className={classes} />;
    }
    case "int": {
      if (type.format == null) {
        return <HashtagIcon className={classes} />;
      }
    }
    case "float": {
      return <HashtagIcon className={classes} />;
    }
    case "string": {
      if (type.format == null) {
        return <StringIcon className={classes} />;
      }

      switch (type.format.name) {
        case "datetime": {
          return <ClockIcon className={classes} />;
        }
        case "json":
        case "jsonPointer": {
          return <CodeBracketIcon className={classes} />;
        }
        case "semver": {
          return <DocumentTextIcon className={classes} />;
        }
      }
    }
  }

  return <></>;
};
