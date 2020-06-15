import fs from "fs";
import toml from "@iarna/toml";

import { loadRubric, loadProducts } from "../parsing";
import { loadContributors } from "../parsing/index";

let files: string[] = ["CONTRIBUTORS.toml"];

files = files.concat(
  fs
    .readdirSync("./rubric/")
    .filter((name) => name.endsWith(".toml"))
    .map((file) => "rubric/" + file)
);
files = files.concat(
  fs
    .readdirSync("./products/")
    .filter((name) => name.endsWith(".toml"))
    .map((file) => "products/" + file)
);

test.each(files)("%s is valid, readable TOML", (file) => {
  expect(() => {
    toml.parse(
      fs.readFileSync(file, {
        encoding: "utf-8",
      })
    );
  }).not.toThrowError();
});

test("rubric parses correctly", () => {
  expect(() => {
    loadRubric();
  }).not.toThrowError();
});

test("products parse correctly", () => {
  expect(() => {
    loadProducts(loadRubric());
  }).not.toThrowError();
});

test("contributors parse correctly", () => {
  expect(() => {
    loadContributors();
  }).not.toThrowError();
})
