import { soxa } from './deps.ts'

export interface EcoflowResponse{
  code: string,
  message?: string,
  data?: {
    soc: number,
    remainTime: number,
    wattsOutSum: number,
    wattsInSum: number
  }
}


export class Ecoflow {
  appKey?: string
  secretKey?: string
  sn?: string

  constructor(  appKey?: string, secretKey?: string, sn?: string) {
    this.appKey = appKey || Deno.env.get("APP_KEY")
    this.secretKey = secretKey || Deno.env.get("SECRET_KEY")
    this.sn = sn || Deno.env.get("SN")
  }

  async fetchData (): Promise<EcoflowResponse> {

    const config = {
      baseURL: 'https://api.ecoflow.com',
      headers: { appKey: this.appKey, secretKey: this.secretKey },
      params: { sn: this.sn }
    }

    try {
      const result = await soxa.get('/iot-service/open/api/device/queryDeviceQuota', config);
      const d: EcoflowResponse = {...result.data}
      return d
    } catch (err) {
      const fail: EcoflowResponse = {code: '0'}
      return fail
    }

  }
}




  