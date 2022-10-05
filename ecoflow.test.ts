import { assert }  from './deps.ts'
import { Ecoflow, EcoflowResponse }  from './ecoflow.ts'

const ecoflow = new Ecoflow()

Deno.test('test 1', async () => {
    const data: EcoflowResponse = await ecoflow.fetchData()
    console.log(data.data?.wattsInSum)
    // assert( data === '[object Object]');
});

