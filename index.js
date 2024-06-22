#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000;
let pin = 1234;
let pinAns = await inquirer.prompt([
    {
        name: "atmPin",
        message: "Enter pin code",
        type: "number"
    },
]);
if (pinAns.atmPin === pin) {
    console.log(chalk.blue("your pin is correct"));
    console.log(chalk.blue(`Current balance is ${myBalance}`));
    let methodAns = await inquirer.prompt([
        {
            name: "methods",
            message: "select one",
            type: "list",
            choices: ["Check balance", "With draw", "Deposit", "Exit"]
        }
    ]);
    if (methodAns.methods === "With draw") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter the amount to with draw",
                type: "number"
            }
        ]);
        if (amountAns.amount > myBalance) {
            console.log(chalk.bgRed("insuficient balance"));
        }
        else {
            myBalance -= amountAns.amount;
            console.log(chalk.yellow(`${amountAns.amount} "Withdrawn successfully"`));
            console.log(chalk.bgYellow(`"Your remaining balance is" ${myBalance}`));
        }
    }
    else if (methodAns.methods === "Check balance") {
        console.log(chalk.bgGray(`"Your current balance is" ${myBalance}`));
    }
    if (methodAns.methods === "Deposit") {
        let depositAmount = await inquirer.prompt([
            {
                name: "deposit",
                message: "Enter the amount to deposit",
                type: "number"
            }
        ]);
        if (myBalance += depositAmount.deposit) {
            console.log(chalk.yellow(`${depositAmount.deposit} "Deposit successfully"`));
            console.log(chalk.bgYellow(`"Your current balance is" ${myBalance}`));
        }
    }
    else if (methodAns.methods === "Exit")
        console.log(chalk.cyanBright("Thank you"));
}
else {
    console.log(chalk.bgRed("Incorrect pin"));
}
