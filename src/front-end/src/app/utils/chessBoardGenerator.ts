import { IChessBoard } from '../../types/chess';

export const arrayOfChar: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const chessBoardGenerator: () => IChessBoard = () => {
    return arrayOfChar.reduce((res: IChessBoard, char: string) => {
        for(let i: number = 1; i < 9; i++) {
            res[`${char}${i}`] = {
                type: null
            };
        }

        return res;
    }, {});

};

export default chessBoardGenerator;