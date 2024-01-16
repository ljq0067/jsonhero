import { useState } from "react";
import { CopyTextButton } from "~/components/CopyTextButton";
import { PreviewBox } from "../PreviewBox";
import { PreviewJson } from "./preview.types";

export function PreviewJson({ preview }: { preview: PreviewJson }) {
  const [hovering, setHovering] = useState(false);
  const jsonHeroUrl = new URL(
    `/actions/createFromUrl?jsonUrl=${encodeURIComponent(preview.url)}`,
    window.location.origin
  );

  jsonHeroUrl.searchParams.append("utm_source", "preview");

  const code = JSON.stringify(preview.json, null, 2);

  return (
    <PreviewBox className="relative">
      <div
        className="relative w-full h-full"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div
          className={`absolute top-0 flex justify-end pt-1 pr-1 w-full transition ${
            hovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <CopyTextButton
            value={code}
            className="bg-slate-200 hover:bg-slate-300 h-fit mr-1 px-2 py-0.5 rounded-sm transition dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600"
          ></CopyTextButton>
        </div>
      </div>
    </PreviewBox>
  );
}
