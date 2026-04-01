const myLink = "./json/data.json";

export async function getAppData() {
  try {
    // fetch data utama, workers, jobs (paralel)
    const [res, workersRes, jobsRes] = await Promise.all([
      fetch(myLink),
      fetch("./json/workers.json"),
      fetch("./json/jobs.json")
    ]);

    // ubah ke JSON
    const [json, workersJson, jobsJson] = await Promise.all([
      res.json(),
      workersRes.json(),
      jobsRes.json()
    ]);

    // mapping worker
    const workerMap = Object.fromEntries(
      workersJson.data.map(w => [w.id, w.name])
    );

    // mapping job
    const jobMap = Object.fromEntries(
      jobsJson.data.map(j => [j.id, j])
    );

    // fetch semua period (data.json)
    const periodPromises = json.periods.map(p =>
      fetch(`json/periods/${p.file}`).then(r => r.json())
    );

    const data = await Promise.all(periodPromises);

    // ambil periode terakhir
    const period = data.length - 1;

    // return ke app
    return { data, period, workerMap, jobMap };

  } catch (err) {
    console.error("Load Data Error:", err);
    return null;
  }
}