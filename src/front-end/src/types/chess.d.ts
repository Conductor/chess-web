export type IColorOfFigure = 'White' | 'Black';

export interface IChessBoard {
    [key: string]: IChessBoardCell;
}

export interface IChessBoardCell {
    type: string;
    owner?: IColorOfFigure;
    onClick?: (target: HTMLButtonElement) => void;
    isDisabled?: boolean;
    isHighlighted?: boolean;
}

export interface IMovePosition {
    origin: string;
    destination: string;
}