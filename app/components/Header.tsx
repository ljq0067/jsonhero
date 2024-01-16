import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { DocumentTitle } from "./DocumentTitle";
import { Form } from "remix";
import { useJsonDoc } from "~/hooks/useJsonDoc";

export function Header() {
  const { doc } = useJsonDoc();

  return (
    <header className="flex items-center justify-between w-screen h-[40px] bg-indigo-700 dark:bg-slate-800 border-b-[1px] border-slate-600">
      <DocumentTitle />
      <ol className="flex items-center gap-2 px-4">
        {!doc.readOnly && (
          <Form
            method="output"
            onSubmit={(e) =>
              !confirm(
                //TODO: output code command
                "This will permanantly delete this document from jsonhero.io, are you sure you want to continue?"
              ) && e.preventDefault()
            }
          >
            <button type="submit">
              <button className="flex items-center justify-center py-1 bg-slate-200 text-slate-800 bg-opacity-90 text-base font-bold px-2 rounded-sm uppercase hover:cursor-pointer hover:bg-opacity-100 transition">
                <ArrowUpTrayIcon className="w-4 h-4 mr-0.5"></ArrowUpTrayIcon>
                Output
              </button>
            </button>
          </Form>
        )}    
      </ol>
    </header>
  );
}
