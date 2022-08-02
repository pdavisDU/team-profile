const inquirer = require("inquirer");
const fs = require("fs");
// const Employee = require('./lib/Employee');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const teams = [];

const mgmtQues = [
  {
    message: "Manager name...",
    name: "mName",
    type: "input",
  },
  {
    message: "Manager ID...",
    name: "mId",
    type: "input",
  },
  {
    message: "Manager E-mail...",
    name: "mEmail",
    type: "input",
  },
  {
    message: "Managers office number...",
    name: "mOffice",
    type: "input",
  },
];

const emplyQues = [
  {
    message: "Do you want to add an Engineer or Intern?",
    name: "role",
    type: "list",
    choices: ["Engineer", "Intern"],
  },
  {
    message: (input) => `What is ${input.role} name`,
    name: "Name",
    type: "input",
  },
  {
    message: (input) => `What is ${input.role} ID`,
    name: "Id",
    type: "input",
  },
  {
    message: (input) => `What is ${input.role} Email`,
    name: "Email",
    type: "input",
  },
  {
    message: (input) => {
      if (input.role === "Engineer") {
        return `What is ${input.role} Github username`;
      } else {
        return `What school did ${input.role} go/goes to`;
      }
    },
    name: "other",
    type: "input",
  },
];
start();

function start() {
  inquirer.prompt(mgmtQues).then((input) => {
    const man = new Manager(
      input.mName,
      input.mId,
      input.mEmail,
      input.mOffice
    );
    teams.push(man);
    console.log(`${input.mName} added`);
    eAdd();
  });
}
// eAdd();
function eAdd() {
  inquirer
    .prompt([
      {
        message: "Add another?",
        name: "addEE",
        type: "confirm",
      },
    ])
    .then((input) => {
      input.addEE ? addEmp() : showHTML();
    });
}

function addEmp() {
  inquirer.prompt(emplyQues).then((input) => {
    if (input.role === "Engineer") {
      const ee = new Engineer(input.name, input.id, input.email, input.other);
      teams.push(ee);
    } else {
      const ee = new Intern(input.name, input.id, input.email, input.other);
      teams.push(ee);
    }
    console.log("Added");
  });
}

function showHTML() {
  const html = `
    <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossorigin="anonymous"/>
            <link rel="stylesheet" href="./assets/css/style.css"/>
            <title>Team</title>
            </head>
            <body>
            <header>
            <h1 class="py-md-4 d-flex justify-content-center pb-4">
            Team</h1>
            </header>
            <main class="container">
            <div class="card-box row justify-content-center">
            ${teams
              .map((Employee) =>
                Employee.createHTML(
                  Employee.officeNumber || Employee.github || Employee.school
                )
              )
              .join("\n")}
            </div>
            </main>
            </body>
            </html>
    `;
  fs.writeFileSync("./dist/index.html", html);
  console.log("page created");
}
