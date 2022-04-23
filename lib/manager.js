const Employee = require('./Employee')

class Manager extends Employee{
    contructor(name, id, email, officeNumber){
        super(name, id, email, "Manager");
        this.officeNumber = officeNumber;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}
module.exports= Manager