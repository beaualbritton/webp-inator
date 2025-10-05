#!/usr/bin/env bun
import { Engine } from "./engine";
import { existsSync, statSync } from "fs";
async function input(prompt: string): Promise<string>
{
  process.stdout.write(prompt);
  for await(const line of console)
  {
    return line;
  }
  return "";
}

let dir: string;  

if(process.argv[2])
{
  dir = process.argv[2]
}
else
{
  dir = `${process.cwd()}/`
}

console.log(dir)

while (!existsSync(dir) || !statSync(dir).isDirectory())
{
  dir = await input("invalid directory, please re-enter");
}
let extension = await input("enter extension: ")
let engine = new Engine(dir, extension)
engine.process();
