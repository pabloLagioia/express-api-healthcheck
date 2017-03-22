var halson = require("halson");

module.exports = function(req, res) {

  var memoryUsage = process.memoryUsage();

  var resource = halson({
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    description: process.env.npm_package_description,
    uptime: Math.round(process.uptime()) + " seconds",
    memoryUsage: {
      rss: Math.round(memoryUsage.rss / 1048576) + "MB",
      heapTotal: Math.round(memoryUsage.heapTotal / 1048576) + "MB",
      heapUsed: Math.round(memoryUsage.heapUsed / 1048576) + "MB",
      external: Math.round(memoryUsage.external / 1048576) + "MB"
    }
  });

  resource.addLink("self", req.url);
  resource.addLink("uptime", "https://nodejs.org/api/process.html#process_process_uptime");
  resource.addLink("memoryUsage", "https://nodejs.org/api/process.html#process_process_memoryusage");

  res
    .status(200)
    .header("Content-Type", "application/hal+json")
    .header("Content-Language", "en-US")
    .send(resource);

}