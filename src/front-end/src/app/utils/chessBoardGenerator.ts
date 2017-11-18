import { IChessBoard } from '../../types/chess';

const chessBoardGenerator: () => IChessBoard = () => {
    const arrayOfChar: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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