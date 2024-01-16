import { JSONStringType } from "@jsonhero/json-infer-types/lib/@types";
import {
  JSONColorFormat,
  JSONJSONFormat,
} from "@jsonhero/json-infer-types/lib/formats";
import Color from "color";
import { CodeViewer } from "~/components/CodeViewer";
import { PreviewBox } from "../PreviewBox";


export function PreviewString({ info }: { info: JSONStringType }) {
  if (info.format == null) {
    return <></>;
  }

  switch (info.format.name) {
    case "datetime":
      if (info.format.parts === "date" || info.format.parts === "datetime") {
        return info.value;
      }
      return <></>;
    case "json":
      return <PreviewJson value={info.value} format={info.format} />;
    default:
      return <></>;
  }
}

function PreviewJson({
  value,
  format,
}: {
  value: string;
  format: JSONJSONFormat;
}) {
  if (format.variant === "json5") {
    return <></>;
  }

  return <CodeViewer code={JSON.stringify(JSON.parse(value), null, 2)} />;
}

function PreviewColor({
  value,
  format,
}: {
  value: string;
  format: JSONColorFormat;
}) {
  const color = new Color(value);

  const textColor = color.isLight() ? "text-slate-800" : "text-slate-100";

  return (
    <>
      <PreviewBox>
        <div>
          <div
            className="flex items-center justify-center w-full h-52"
            style={{ backgroundColor: color.hex().toString() }}
          >
            <p className={`text-center text-xl ${textColor}`}>{value}</p>
          </div>
        </div>
      </PreviewBox>
    </>
  );
}
