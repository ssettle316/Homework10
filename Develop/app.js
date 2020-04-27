const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const teamMembers = [];
const idArray = [];

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//code for creating a manager

function createManager() {
  console.log("Please build your team");
  inquirer.prompt([
    {
      type: "input",
      name: "managerName",
      message: "What is your manager's name?",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
    },
    {
      type: "input",
      name: "managerId",
      message: "What is your manager's id?",
      validate: answer => {
        const pass = answer.match(
          /^[1-9]\d*$/
        );
        if (pass) {
          return true;
        }
        return "Please enter a positive number greater than zero.";
      }
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is your manager's email?",
      validate: answer => {
        const pass = answer.match(
          /\S+@\S+\.\S+/
        );
        if (pass) {
          return true;
        }
        return "Please enter a valid email address.";
      }
    },
    {
      type: "input",
      name: "managerOfficeNumber",
      message: "What is your manager's office number?",
      validate: answer => {
        const pass = answer.match(
          /^[1-9]\d*$/
        );
        if (pass) {
          return true;
        }
        return "Please enter a positive number greater than zero.";
      }
    }
  ]).then(answers => {
    const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
    teamMembers.push(manager);
    console.log(teamMembers);
    idArray.push(answers.managerId);
    createTeamMember();
  });
}
createManager();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function createTeamMember() {
  inquirer.prompt([
    {
      name: "employeeSelector",
      type: "list",
      message: "Which employee type would you like?",
      choices: ["Intern", "Engineer", "Finished"]
    }

  ]).then(answers => {
    if (answers.employeeSelector === "Intern") {
      console.log("Intern selected");
      createIntern();
    }
    else if (answers.employeeSelector === "Engineer") {
      console.log("Engineer is selected");
      createEngineer();
    }
    else if (answers.employeeSelector === "Finished") {
      console.log("You are finished");
      finalSelect()
    }
    console.log(answers.employeeSelector);
  })
}

function createIntern() {
  console.log("Adding new intern to your team");
  inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: "What is your intern's name?",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
    },
    {
      type: "input",
      name: "internId",
      message: "What is your intern's id?",
      validate: answer => {
        const pass = answer.match(
          /^[1-9]\d*$/
        );
        if (pass) {
          return true;
        }
        return "Please enter a positive number greater than zero.";
      }
    },
    {
      type: "input",
      name: "internEmail",
      message: "What is your intern's email?",
      validate: answer => {
        const pass = answer.match(
          /\S+@\S+\.\S+/
        );
        if (pass) {
          return true;
        }
        return "Please enter a valid email address.";
      }
    },
    {
      type: "input",
      name: "internSchool",
      message: "What is your intern's school?"
    }
  ]).then(answers => {
    const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
    teamMembers.push(intern);
    console.log(teamMembers);
    idArray.push(answers.internId);
    createTeamMember();

  });
}

function createEngineer() {
  console.log("Adding new engineer to your team");
  inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: "What is your engineer's name?",
      validate: answer => {
        if (answer !== "") {
          return true;
        }
        return "Please enter at least one character.";
      }
    },
    {
      type: "input",
      name: "engineerId",
      message: "What is your engineer's id?",
      validate: answer => {
        const pass = answer.match(
          /^[1-9]\d*$/
        );
        if (pass) {
          return true;
        }
        return "Please enter a positive number greater than zero.";
      }
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is your engineer's email?",
      validate: answer => {
        const pass = answer.match(
          /\S+@\S+\.\S+/
        );
        if (pass) {
          return true;
        }
        return "Please enter a valid email address.";
      }
    },
    {
      type: "input",
      name: "engineerGithub",
      message: "What is your engineer's Github?"
    }
  ]).then(answers => {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
    teamMembers.push(engineer);
    console.log(teamMembers);
    idArray.push(answers.engineerId);
    createTeamMember();

  });
}
// createTeamMember();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function finalSelect() {
  var data = render(teamMembers)
  fs.writeFile(outputPath, data, function (err) {
    if (err) return console.log(err);
    console.log('Success');
  });
}


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```