import {
  CubeIcon,
  Squares2X2Icon,
  NoSymbolIcon,
  CheckCircleIcon,
  ClockIcon,
  ChatBubbleBottomCenterTextIcon,
  CodeBracketIcon,
  DocumentIcon,
  DocumentTextIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import { inferType, JSONValueType } from "@jsonhero/json-infer-types";
import { StringIcon } from "~/components/Icons/StringIcon";
import { IconComponent } from "~/useColumnView";

export function iconForValue(value: unknown): IconComponent {
  return iconForType(inferType(value));
}

export function iconForType(type: JSONValueType): IconComponent {
  switch (type.name) {
    case "object": {
      return CubeIcon;
    }
    case "array": {
      return Squares2X2Icon;
    }
    case "null": {
      return NoSymbolIcon;
    }
    case "bool": {
      return CheckCircleIcon;
    }
    case "int": {
      return HashtagIcon;
    }
    case "float": {
      return HashtagIcon;
    }
    case "string": {
      if (type.format == null) {
        return StringIcon;
      }

      switch (type.format.name) {
        case "json":
        case "jsonPointer": {
          return CodeBracketIcon;
        }
        case "datetime": {
          return ClockIcon;
        }
        case "semver": {
          return DocumentTextIcon;
        }
        default: {
          return ChatBubbleBottomCenterTextIcon;
        }
      }
    }
    default: {
      return DocumentIcon;
    }
  }
}
