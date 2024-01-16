import { InfoHeader } from "./InfoHeader";
import { ContainerInfo } from "./ContainerInfo";
import { useSelectedInfo } from "~/hooks/useSelectedInfo";
import { useRelatedPaths } from "~/hooks/useRelatedPaths";

export function InfoPanel() {
  const selectedInfo = useSelectedInfo();
  const relatedPaths = useRelatedPaths();

  if (!selectedInfo) {
    return <></>;
  }

  return (
    <>
      <div
        className={`h-inspectorHeight p-4 bg-white border-l-[1px] border-slate-300 overflow-y-auto no-scrollbar transition dark:bg-slate-800 dark:border-slate-600`}
      >
        <InfoHeader relatedPaths={relatedPaths} />

        <ContainerInfo />

      </div>
    </>
  );
}
