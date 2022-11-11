import { Roles } from "../enum/role.enum";

export const verifyRoles = (value: any) => {
    if (value == 0) {
        return Roles.ADMIN
    } else if (value == 1) {
        return Roles.USER_ADMIN
    } else {
        return Roles.USER
    }
}

export const ifNullNewValue = (valor: any, ifNull: any) => {
    if (valor == null || undefined) {
        return valor = ifNull;
    } else {
        return valor;
    }
}

export const anyToDate = (value: any) => {
    try {
        value = Number(value)
        const date = new Date(value);
        return `${date.toLocaleDateString("pt-br")} ${date.toLocaleTimeString("pt-br")}`
    } catch (error) {
        console.log(error)
        return value;
    }
}

