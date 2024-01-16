import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
} from "remix";
import invariant from "tiny-invariant";
import { outputDocument, getDocument, JSONDocument } from "~/jsonDoc.server";
import { JsonDocProvider } from "~/hooks/useJsonDoc";
import { useEffect } from "react";
import { JsonProvider } from "~/hooks/useJson";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { InfoPanel } from "~/components/InfoPanel";
import Resizable from "~/components/Resizable";
import { SideBar } from "~/components/SideBar";
import { JsonColumnViewProvider } from "~/hooks/useJsonColumnView";
import { JsonView } from "~/components/JsonView";
import { JsonTreeViewProvider } from "~/hooks/useJsonTree";
import { JsonSearchProvider } from "~/hooks/useJsonSearch";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "expected params.id");

  const doc = await getDocument(params.id);

  if (!doc) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const path = getPathFromRequest(request);

    return {
      doc,
      json: JSON.parse(doc.contents),
      path
    };
};

export const action: ActionFunction = async ({ request, params }) => {
  // Return if the request is not a OUTPUT
  if (request.method !== "OUTPUT") {
    return;
  }

  invariant(params.id, "expected params.id");


  const document = await getDocument(params.id);
  //TODO: output param
  if (!document) {

    return;
  }

  await outputDocument(params.id);

  return redirect(`/j/${params.id}`);
};

function getPathFromRequest(request: Request): string | null {
  const url = new URL(request.url);

  const path = url.searchParams.get("path");

  if (!path) {
    return null;
  }

  if (path.startsWith("$.")) {
    return path;
  }

  return `$.${path}`;
}

type LoaderData = { doc: JSONDocument; json: unknown; path?: string };

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  let title = "JSON Hero";

  if (data) {
    title += ` - ${data.doc.title}`;
  }

  return {
    title,
    "og:title": title,
    robots: "noindex,nofollow",
  };
};

export default function JsonDocumentRoute() {
  const loaderData = useLoaderData<LoaderData>();

  // Redirect back to `/j/${slug}` if the path is set, that way refreshing the page doesn't go to the path in the url.
  const location = useLocation();

  useEffect(() => {
    if (loaderData.path) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [loaderData.path]);

  return (
    <JsonDocProvider
      doc={loaderData.doc}
      path={loaderData.path}
      key={loaderData.doc.id}
    >
      <JsonProvider initialJson={loaderData.json}>
        <JsonColumnViewProvider>
          <JsonSearchProvider>
            <JsonTreeViewProvider overscan={25}>
              <div>
                <div className="h-screen flex flex-col sm:overflow-hidden">
                  <Header />
                  <div className="bg-slate-50 flex-grow transition dark:bg-slate-900 overflow-y-auto">
                    <div className="main-container flex justify-items-stretch h-full">
                      <SideBar />
                      <JsonView>
                        <Outlet />
                      </JsonView>

                      <Resizable
                        isHorizontal={true}
                        initialSize={500}
                        minimumSize={280}
                        maximumSize={900}
                      >
                        <div className="info-panel flex-grow h-full">
                          <InfoPanel />
                        </div>
                      </Resizable>
                    </div>
                  </div>

                  <Footer></Footer>
                </div>
              </div>
            </JsonTreeViewProvider>
          </JsonSearchProvider>
        </JsonColumnViewProvider>
      </JsonProvider>
    </JsonDocProvider>
  );
}
