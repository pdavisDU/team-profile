class Employee {
    constructor(name, id, email, role = 'Employee') {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return this.role;
    }
    createHTML(other){
        return `
        <div class="card col-8 col-md-5>
        <div class="card-header mt-3">
        <h2>${this.name}</h2>
        <h4>${this.role}</h4>
        </div>
        <div class="card-body">
        <ul class="list-group" style="list-style: none; text-decoration: none; padding: 0">
        <li class="list-group-item">ID: ${this.id}</li>
        <li class="list-group-item">E-mail: <a href="mailto:${this.email}" style="color: white">E-mail:${this.email}</a></li>
        ${this.role === "Manager" ?
    `<li class="list-group-item"> Office #: ${other}</li>` :
    this.role === "Engineer" ?
    `<li class="list-group-item" ><a href="https://github.com/${other}" style="color:white">Github: ${other}</a></li>` :
    `<li class="list-group-item" >School: ${other}</li>`
    }
    </ul>
    </div>
    </div>
        `
    }
}
module.exports = Employee