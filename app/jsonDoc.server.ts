import { customRandom } from "nanoid";

type BaseJsonDocument = {
  id: string;
  title: string;
  readOnly: boolean;
};

export type RawJsonDocument = BaseJsonDocument & {
  type: "raw";
  contents: string;
};


export type CreateJsonOptions = {
  ttl?: number;
  readOnly?: boolean;
  injest?: boolean;
  metadata?: any;
};

export type JSONDocument = RawJsonDocument;

export async function createFromUrlOrRawJson(
  urlOrJson: string,
  title?: string
): Promise<JSONDocument | undefined> {
  if (isJSON(urlOrJson)) {
    return createFromRawJson("Untitled", urlOrJson);
  }
}

export async function createFromRawJson(
  filename: string,
  contents: string,
  options?: CreateJsonOptions
): Promise<JSONDocument> {
  const docId = createId();
  const doc: JSONDocument = {
    id: docId,
    type: <const>"raw",
    contents,
    title: filename,
    readOnly: options?.readOnly ?? false,
  };

  JSON.parse(contents);
  await DOCUMENTS.put(docId, JSON.stringify(doc), {
    expirationTtl: options?.ttl ?? undefined,
    metadata: options?.metadata ?? undefined,
  });

  return doc;
}

export async function getDocument(
  slug: string
): Promise<JSONDocument | undefined> {
  const doc = await DOCUMENTS.get(slug);

  if (!doc) return;

  return JSON.parse(doc);
}

export async function updateDocument(
  slug: string,
  title: string
): Promise<JSONDocument | undefined> {
  const document = await getDocument(slug);

  if (!document) return;

  const updated = { ...document, title };

  await DOCUMENTS.put(slug, JSON.stringify(updated));

  return updated;
}

export async function outputDocument(slug: string): Promise<void> {
  //TODO: output code result
  //await DOCUMENTS.delete(slug);
}

function createId(): string {
  const nanoid = customRandom(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    12,
    (bytes: number): Uint8Array => {
      const array = new Uint8Array(bytes);
      crypto.getRandomValues(array);
      return array;
    }
  );
  return nanoid();
}

function isJSON(possibleJson: string): boolean {
  try {
    JSON.parse(possibleJson);
    return true;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
