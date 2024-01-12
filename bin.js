#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from 'yargs/helpers'

async function main(args) {
    if (args.argv._.length <= 1) {
        console.log("Let's go!")
    } else {
        console.error(`\nerror: unexpected arguments\nusage: npx get-react-template <project name>:optional\n`)
    }
}
const args = yargs(hideBin(process.argv));
main(args);