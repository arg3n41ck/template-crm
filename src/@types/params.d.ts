declare global {
  export interface GlobalParams {
    limit?: number | string
    offset?: number | string
  }

  export type CommonQuery = Record<string, string> & GlobalParams & {}
  export type ParamKey = string
}

export {}
