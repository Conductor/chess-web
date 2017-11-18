export type IColorOfFigure = 'White' | 'Black';

export interface IChessBoard {
    [key: string]: IChessBoardCell;
}

export interface IChessBoardCell {
    type: string;
    owner?: IColorOfFigure;
    isHighlighted?: boolean;
}