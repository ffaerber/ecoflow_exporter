

import { Application, Router } from "./deps.ts";
import { Gauge, Registry } from "./deps.ts";
import { Ecoflow, EcoflowResponse } from "./ecoflow.ts";

const soc = Gauge.with({
  name: "battery_percentage",
  help: "battery percentage",
  labels: ["percentage"],
});

const remainTime = Gauge.with({
  name: "remain_minutes_to_fully_charged",
  help: "remain minutes to fully charged",
  labels: ["minute"],
});

const wattsOutSum = Gauge.with({
  name: "current_power_out",
  help: "current power out",
  labels: ["watt"],
});

const wattsInSum = Gauge.with({
  name: "current_power_in",
  help: "current power in",
  labels: ["watt"],
});



const ecoflow = new Ecoflow()
const app = new Application();

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.body = "Hello!";
  })
  .get("/metrics", (ctx)  => {
    ctx.response.headers.set("Content-Type", "");
    ctx.response.body = Registry.default.metrics();
  });

app.use(async (ctx, next) => {

  const response: EcoflowResponse = await ecoflow.fetchData()
  if(!response.data) return false
  soc.set(response.data?.soc);
  remainTime.set(response.data?.remainTime);
  wattsOutSum.set(response.data?.wattsOutSum);
  wattsInSum.set(response.data?.wattsInSum);
  await next();
});

app.use(router.routes());

await app.listen({ port: 8080 });