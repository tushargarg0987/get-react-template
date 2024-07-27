#!/usr/bin/env node

import { exec, spawn } from "child_process";
import yargs from "yargs";
import { hideBin } from 'yargs/helpers'
import select from '@inquirer/select';
import { fetchTemplates } from "./helper.js";

async function main(args) {
    const anim2 = (function () {
        var P = ["\\", "|", "/", "-"];
        var emo = ["🏋️‍♂️","🚶‍♂️","🏃‍♂️","🚴‍♂️"]
        var x = 0
        return setInterval(function () {
            process.stdout.write(`\r\x1b[1m\x1b[5m${emo[x]} Fetching latest react templates... \x1b[0m\x1b[1m${P[x++]}\x1b[0m`);
            x &= 3;
        }, 250);
    })();
    const data = await fetchTemplates();
    clearInterval(anim2)
    process.stdout.write(`\r`);
    const mapData = [];
    data.map((ele) => {
        mapData.push({
            name: ele.name,
            value: { git: ele.repo, repoName: ele.repoName, name: ele.name, script: ele.script },
            description: `\n\x1b[0mDescription: \x1b[1m\x1b[4m${ele.description} ${ele.livePreview ? "\n\x1b[0mLive Preview : \x1b[1m\x1b[34m" + ele.livePreview + " " : ""}\n\x1b[0mGithub Repository: \x1b[1m\x1b[34m${ele.repo.split('.git')[0]} \n\x1b[0mOwner: \x1b[1m\x1b[4m${ele.author.name} \n\x1b[0mThanks to \x1b[1m\x1b[34m${ele.author.github} \x1b[0m`
        })
    })
    if (args.argv._.length <= 1) {
        const answer = await select({
            message: 'Select a template (Use arrow keys)',
            choices: mapData,
            pageSize: 7
        });
        console.log(`\n`);
        const anim = (function () {
            var P = ["\\", "|", "/", "-"];
            var emo = ["🏋️‍♂️","🚶‍♂️","🏃‍♂️","🚴‍♂️"]
            var x = 0
            return setInterval(function () {
                process.stdout.write(`\r\x1b[1m\x1b[5m${emo[x]} Creating the template for ${answer.name} .. \x1b[0m\x1b[1m${P[x++]}\x1b[0m`);
                x &= 3;
            }, 250);
        })();
        exec(`git clone ${answer.git} ${args.argv._.length > 0 ? args.argv._[0] : ""}`, (err, stdout, stderr) => {
            if (err) {
                clearInterval(anim)
                console.log(`\nerror: ${err.stack}`);
                return;
            }
            clearInterval(anim)
            process.stdout.write(`\r\x1b[32m ✨ Successfully created the template for \x1b[1m${answer.name}\x1b[0m\n\n`);
            const installationProcess = spawn(`cd ${args.argv._.length > 0 ? args.argv._[0] : answer.repoName} && npm install .`, { stdio: 'inherit', shell: true });
            installationProcess.on('exit', (code, signal) => {
                if (code === 0) {
                    console.log(`\n\n  \x1b[32m🎉 The template was setup successfully\x1b[0m \n\x1b[48;5;235m\n\n  To start the app run: \n\n\t\x1b[33mcd\x1b[0m\x1b[48;5;235m ${args.argv._.length > 0 ? args.argv._[0] : answer.repoName}\x1b[48;5;235m\n\n\t${answer.script} \n\x1b[0m\n\n  \x1b[36mHappy Hacking 😎!!\x1b[0m\n`);
                } else {
                    console.error(`  🥲 Installation Failed. \n\x1b[48;5;235m\n\n  Please try again or install manually by running: \n\n\t\x1b[33mcd\x1b[0m\x1b[48;5;235m ${args.argv._.length > 0 ? args.argv._[0] : answer.repoName}\x1b[48;5;235m\n\n\t${answer.script} \n\x1b[0m\n`);
                }
            })
        })
    } else {
        console.error(`\nerror: unexpected arguments\nusage: npx get-react-template <project name>:optional\n`)
    }
}
const args = yargs(hideBin(process.argv));
main(args);