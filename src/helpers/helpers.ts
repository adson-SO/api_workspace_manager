import { Employee } from "src/entities/employee.entity";

export class Helpers {
    static validateCpf(cpf: string): boolean {
        if(
            cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999'
        ) {
            return false;
        }

        let soma: number = 0;
        let resto: number;

        for(let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;

        if(resto === 10 || resto === 11) {
            resto = 0;
        }

        if(resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        soma = 0;

        for(let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;

        if(resto === 10 || resto === 11) {
            resto = 0;
        }

        if(resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    }

    static formatCpf(employee: Employee): Employee {
        const cpf = employee.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        const result = Object.assign(employee, { cpf: cpf });
        return result;
    }

    static ageValidator(date: Date): boolean {
        const today = new Date();
        const birthdate = date;

        const currentYear = today.getFullYear();
        const birthYear = birthdate.getFullYear();

        const currentMonth = today.getMonth() + 1;
        const birthMonth = birthdate.getMonth() + 1;

        const currentDay = today.getDate();
        const birthDay = birthdate.getDate();

        if(currentYear - birthYear > 18) {
            return true;
        }

        if(currentYear - birthYear === 18 && birthMonth < currentMonth) {
            return true;
        }

        if(birthMonth === currentMonth && birthDay <= currentDay) {
            return true;
        }

        return false;
    }
}