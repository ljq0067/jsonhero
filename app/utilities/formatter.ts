import {
  JSONDateTimeFormat,
  JSONStringFormat,
  JSONValueType,
} from "@jsonhero/json-infer-types";

export function formatRawValue(type: JSONValueType): string {
  switch (type.name) {
    case "string":
      return type.value;
    case "int":
      return type.value.toString();
    case "float":
      return type.value.toString();
    case "bool":
      return type.value ? "true" : "false";
    case "null":
      return "null";
    case "array":
      return "[]";
    case "object":
      return "{}";
  }
}

export type FormatValueOptions = {
  leafNodesOnly?: boolean;
};

export function formatValue(
  type: JSONValueType,
  options?: FormatValueOptions
): string | undefined {
  switch (type.name) {
    case "array": {
      if (options?.leafNodesOnly) {
        return;
      }

      if (type.value.length == 0) {
        return formatRawValue(type);
      } else if (type.value.length === 1) {
        return `1 item`;
      } else {
        return `${type.value.length} items`;
      }
    }
    case "object": {
      if (options?.leafNodesOnly) {
        return;
      }

      if (Object.keys(type.value).length == 0) {
        return formatRawValue(type);
      } else if (Object.keys(type.value).length === 1) {
        return `1 field`;
      } else {
        return `${Object.keys(type.value).length} fields`;
      }
    }
    case "bool": {
      return type.value ? "true" : "false";
    }
    case "float":
    case "int":
      return formatNumber(type.value);
    case "null": {
      return "null";
    }
    case "string":
      return formatString(type.value, type.format);
    default:
      const _exhaustiveCheck: never = type;
      return _exhaustiveCheck;
  }
}

const numberFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 6,
});

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

function formatString(value: string, format?: JSONStringFormat): string {
  if (!format) {
    return value;
  }

  switch (format.name) {
    /* 
    case "uri":
      return value;
    case "datetime":
      return formatDateTime(value, format); 
    */
   // TODO: case "Please Enter":
    default:
      return value;
  }
}
/* 
export function formatDateTime(
  value: string,
  format?: JSONDateTimeFormat
): string {
  if (!format) {
    return value;
  }

  const temporal = inferTemporal(value, format);

  if (!temporal) {
    return value;
  }

  switch (format.parts) {
    case "datetime":
      return temporal.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });
    case "date":
      return temporal.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "time":
      return temporal.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
  }
}
*/
