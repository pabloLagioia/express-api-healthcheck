var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var healthcheck = require("./index");
var express = require("express");
var app = express();

chai.use(chaiHttp);

app.get("/healthcheck", healthcheck());
app.get("/healthcheck-mem", healthcheck(true));

app.listen(3010)

describe("Express healthcheck middleware", function () {

  it("should return health status", function(done) {

    chai.request(app)
      .get("/healthcheck")
      .set("Content-Type", "application/json")
      .send()
      .end(function (err, response) {

        expect(err).to.be.null;

        expect(response.header["content-type"]).to.equal("application/hal+json; charset=utf-8");
        expect(response.header["content-language"]).to.equal("en-US");
        expect(response.body).not.to.be.null;
        expect(response.body._links).not.to.be.null;
        expect(response.statusCode).to.equal(200);

        done();

      });

  });

  it("should health status and memory usage", function(done) {

    chai.request(app)
      .get("/healthcheck-mem")
      .set("Content-Type", "application/json")
      .send()
      .end(function (err, response) {

        expect(err).to.be.null;

        expect(response.header["content-type"]).to.equal("application/hal+json; charset=utf-8");
        expect(response.header["content-language"]).to.equal("en-US");
        expect(response.body).not.to.be.null;
        expect(response.body._links).not.to.be.null;
        expect(response.body.memoryUsage).not.to.be.null;
        expect(response.statusCode).to.equal(200);

        done();

      });

  });

});