import { convertNullToUndefined } from "./utils/nullishConversion"

interface O {
    nome: string,
    idade: number,
    descricao: string | null,
}

const o: O = {
    nome: 'Roberto',
    idade: 30,
    descricao: null,
}

const b = convertNullToUndefined(o);

