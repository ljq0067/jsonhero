export declare type PreviewJson = {
  url: string;
  contentType: "json";
  json: unknown;
};

export declare type PreviewInfo = PreviewJson;
export declare type PreviewResult = PreviewInfo | { error: string };