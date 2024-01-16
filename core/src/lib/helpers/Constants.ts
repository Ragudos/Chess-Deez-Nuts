/**
 * Constants used for the program.
 */
class Constants {
    /**
     * A binary representation of the pieces on a chess board.
     * for more efficiency.
     */
    private static readonly _Piece = {
        None: 0,
        Pawn: 1,
        Knight: 2,
        Bishop: 3,
        Rook: 4,
        Queen: 5,
        King: 6,
    };

    /**
     * A binary representation of the colors of the pieces on a chess board
     * for more efficiency.
     */
    private static readonly _Color = {
        WHITE: 0,
        BLACK: 8, 
    };

    /**
     * A binary representation of both white and black pieces
     * after performing a bitwise OR operation on the {@link _Piece} and {@link _Color} objects.
     */
    public static readonly Piece = {
        None: Constants._Piece.None,
        Pawn: Constants._Piece.Pawn,
        Knight: Constants._Piece.Knight,
        Bishop: Constants._Piece.Bishop,
        Rook: Constants._Piece.Rook,
        Queen: Constants._Piece.Queen,
        King: Constants._Piece.King,
        WhitePawn: Constants._Piece.Pawn | Constants._Color.WHITE,
        WhiteKnight: Constants._Piece.Knight | Constants._Color.WHITE,
        WhiteBishop: Constants._Piece.Bishop | Constants._Color.WHITE,
        WhiteRook: Constants._Piece.Rook | Constants._Color.WHITE,
        WhiteQueen: Constants._Piece.Queen | Constants._Color.WHITE,
        WhiteKing: Constants._Piece.King | Constants._Color.WHITE,
        BlackPawn: Constants._Piece.Pawn | Constants._Color.BLACK,
        BlackKnight: Constants._Piece.Knight | Constants._Color.BLACK,
        BlackBishop: Constants._Piece.Bishop | Constants._Color.BLACK,
        BlackRook: Constants._Piece.Rook | Constants._Color.BLACK,
        BlackQueen: Constants._Piece.Queen | Constants._Color.BLACK,
        BlackKing: Constants._Piece.King | Constants._Color.BLACK,
    };
}

export default Constants;
