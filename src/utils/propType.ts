interface RequestConfig {
  'content-type'?: string | undefined;
  [key: string]: any;
}

type ErrorFunction = (data: any[], headers: any, status: number) => any;

export type { RequestConfig, ErrorFunction };
