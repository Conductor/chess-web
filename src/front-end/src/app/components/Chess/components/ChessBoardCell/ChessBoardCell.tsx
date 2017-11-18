import * as React from 'react';
import { IChessBoardCell } from '../../../../../types/chess';

const styles: any = require('./chessBoardCell.scss');

interface IChessBoardCellProps extends IChessBoardCell {
    cellName: string;
}

const ChessBoardCell: (props: IChessBoardCellProps) => JSX.Element = (props) => {
    const { cellName, type, owner, isHighlighted } = props;
    return (
        <div className={ styles.cell }>
            {cellName}, {type}, {owner}, {isHighlighted && 'true'}
        </div>
    );
};

export default ChessBoardCell;