#!/usr/bin/env node

import { exec, spawn } from "child_process";
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
            choices: mapData,
            pageSize: 7
        });
        console.log(`\n`);
        // console.log(answer)
        exec(`git clone ${answer.git} ${args.argv._.length > 0 ? args.argv._[0] : ""}`, (err, stdout, stderr) => {
            if (err) {
                clearInterval(anim)
                console.log(`\nerror: ${err.stack}`);
                return;
            }
            console.log(`\n ${stdout}`);
            const installationProcess = spawn(`cd ${args.argv._.length > 0 ? args.argv._[0] : answer.repoName} && npm install .`, { stdio: 'inherit', shell: true });
            installationProcess.on('exit', (code, signal) => {
                if (code === 0) {
                    console.log(`Success`);
                } else {
                    console.error(`Fail`);
                }
            })
        })
    } else {
        console.error(`\nerror: unexpected arguments\nusage: npx get-react-template <project name>:optional\n`)
    }
}
const args = yargs(hideBin(process.argv));
main(args);