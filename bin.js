#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from 'yargs/helpers'
import select from '@inquirer/select';
import { fetchTemplates } from "./helper";

async function main(args) {
    const data = await fetchTemplates();
    if (args.argv._.length <= 1) {
        const answer = await select({
            message: 'Select a react theme',
            choices: [
                {
                    name: 'npm',
                    value: 'npm',
                    description: 'npm is the most popular package manager',
                },
                {
                    name: 'yarn',
                    value: 'yarn',
                    description: 'yarn is an awesome package manager',
                },
            ],
            pageSize: 7
        });
        console.log(answer)
    } else {
        console.error(`\nerror: unexpected arguments\nusage: npx get-react-template <project name>:optional\n`)
    }
}
const args = yargs(hideBin(process.argv));
main(args);