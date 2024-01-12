#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from 'yargs/helpers'
import select from '@inquirer/select';
import { fetchTemplates } from "./helper";

async function main(args) {
    const data = await fetchTemplates();
    const mapData = [];
    data.map((ele) => {
        mapData.push({
            name: ele.name,
            value: { git: ele.repo, repoName: ele.repoName, name: ele.name, script: ele.script },
            description: `\n\x1b[0mDescription: \x1b[1m\x1b[4m${ele.description} \n\x1b[0mLive Preview : \x1b[1m\x1b[34m${ele.livePreview} \n\x1b[0mGithub Repository: \x1b[1m\x1b[34m${ele.repo.split('.git')[0]} \n\x1b[0mOwner: \x1b[1m\x1b[4m${ele.author.name} \n\x1b[0mThanks to \x1b[1m\x1b[34m${ele.author.github} \x1b[0m`
        })
    })
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