import chessBoardGenerator from '../app/utils/chessBoardGenerator';
import { IChessBoard } from '../types/chess';
import { ChessStore } from '../app/components/Chess/ChessStore';

describe('chessBoardGenerator', () => {
    it('create new chessBoard', () => {
        const chessBoardData: IChessBoard = chessBoardGenerator();
        expect(chessBoardData.a1.type).toBe( null);
        expect(Object.keys(chessBoardData).length).toBe(64);
    });
});

describe('ChessStore', () => {
    it('create new store', () => {
        const store: ChessStore = new ChessStore();
        expect(store.chessBoard).toBe(undefined);
        expect(store.gameOver).toBe(undefined);
        expect(store.currentPlayer).toBe(null);
    });
});

describe('chessBoardData', () => {
    it('change chessBoard', () => {
        const store: ChessStore = new ChessStore();
        store.chessBoard = {a1: {type: 'r', owner: 'White'}};
        expect(store.chessBoardData.a1.type).toBe('r');
        expect(store.chessBoardData.a1.owner).toBe('White');
    });
});