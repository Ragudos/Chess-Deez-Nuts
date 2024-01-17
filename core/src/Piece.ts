type PieceColors = typeof Piece.White | typeof Piece.Black;

/**
 * A chess piece. We use a binary representation of the pieces on a chess board
 * for less memory usage.
 */
class Piece {
    // Piece Symbols
    protected static readonly NoneSymbol = Symbol(" ");
    protected static readonly WhitePawnSymbol = Symbol("P");
    protected static readonly WhiteKnightSymbol = Symbol("N");
    protected static readonly WhiteBishopSymbol = Symbol("B");
    protected static readonly WhiteRookSymbol = Symbol("R");
    protected static readonly WhiteQueenSymbol = Symbol("Q");
    protected static readonly WhiteKingSymbol = Symbol("K");
    protected static readonly BlackPawnSymbol = Symbol("p");
    protected static readonly BlackKnightSymbol = Symbol("n");
    protected static readonly BlackBishopSymbol = Symbol("b");
    protected static readonly BlackRookSymbol = Symbol("r");
    protected static readonly BlackQueenSymbol = Symbol("q");
    protected static readonly BlackKingSymbol = Symbol("k");

    // Piece Types
    public static readonly None = 0;
    public static readonly Pawn = 1;
    public static readonly Knight = 2;
    public static readonly Bishop = 3;
    public static readonly Rook = 4;
    public static readonly Queen = 5;
    public static readonly King = 6;

    // Colors
    public static readonly White = 0;
    public static readonly Black = 8;

    // Pieces
    protected static readonly WhitePawn = Piece.Pawn | Piece.White; // 1
    protected static readonly WhiteKnight = Piece.Knight | Piece.White; // 2
    protected static readonly WhiteBishop = Piece.Bishop | Piece.White; // 3
    protected static readonly WhiteRook = Piece.Rook | Piece.White; // 4
    protected static readonly WhiteQueen = Piece.Queen | Piece.White; // 5
    protected static readonly WhiteKing = Piece.King | Piece.White; // 6
    protected static readonly BlackPawn = Piece.Pawn | Piece.Black; // 9
    protected static readonly BlackKnight = Piece.Knight | Piece.Black; // 10
    protected static readonly BlackBishop = Piece.Bishop | Piece.Black; // 11
    protected static readonly BlackRook = Piece.Rook | Piece.Black; // 12
    protected static readonly BlackQueen = Piece.Queen | Piece.Black; // 13
    protected static readonly BlackKing = Piece.King | Piece.Black; // 14

    /**
     * Used to check for the color of a piece using the bitwise AND operator.
     * (1 - 9) & 0b1000 = 0; Any piece with a color of 0 is white.
     * (9 - 14) & 0b1000 = 8; Any piece with a color of 8 is black.
     */
    protected static readonly COLOR_BIT = 0b1000;
    /**
     * Used to check for the type of a piece using the bitwise AND operator.
     * (1 - 6) & 0b0111 = 1 - 6; Any piece with a type of 1 - 6 is a pawn, knight, bishop, rook, queen, or king.
     * (9 - 14) & 0b0111 = 1 - 6; Any piece with a type of 9 - 14 is a pawn, knight, bishop, rook, queen, or king.
     */
    protected static readonly PIECE_TYPE_BIT = 0b0111;

    public static is_color_black(piece: number): boolean {
        return (piece & Piece.COLOR_BIT) === Piece.Black && piece !== Piece.None;
    }

    public static is_color_white(piece: number): boolean {
        return (piece & Piece.COLOR_BIT) === Piece.White && piece !== Piece.None;
    }

    /**
     * @param piece Any piece black or white
     * @returns 0 or 8 integer which is a binary representation of white and black
     */
    public static get_color(piece: number): number {
        return piece & Piece.COLOR_BIT;
    }

    /**
     * 
     * @param piece Any piece black or white
     * @returns 1 - 6 integer which is a binary representation of the piece type
     */
    public static get_type(piece: number): number {
        return piece & Piece.PIECE_TYPE_BIT;
    }

    public static get_symbol(piece: number): symbol {
        const piece_type = Piece.get_type(piece);
        const is_white = Piece.is_color_white(piece);

        let symbol: symbol;

        switch(piece_type) {
            case Piece.Pawn:
                symbol = is_white ? Piece.WhitePawnSymbol : Piece.BlackPawnSymbol;
                break;
            case Piece.Knight:
                symbol = is_white ? Piece.WhiteKnightSymbol : Piece.BlackKnightSymbol;
                break;
            case Piece.Bishop:
                symbol = is_white ? Piece.WhiteBishopSymbol : Piece.BlackBishopSymbol;
                break;
            case Piece.Rook:
                symbol = is_white ? Piece.WhiteRookSymbol : Piece.BlackRookSymbol;
                break;
            case Piece.Queen:
                symbol = is_white ? Piece.WhiteQueenSymbol : Piece.BlackQueenSymbol;
                break;
            case Piece.King:
                symbol = is_white ? Piece.WhiteKingSymbol : Piece.BlackKingSymbol;
                break;
            default:
                symbol = Piece.NoneSymbol;
                break;
        }

        return symbol;
    }

    public static get_piece_type_from_symbol(symbol: symbol): number {
        let piece_type: number;

        switch(symbol) {
            case Piece.WhitePawnSymbol:
            case Piece.BlackPawnSymbol:
                piece_type = Piece.Pawn;
                break;
            case Piece.WhiteKnightSymbol:
            case Piece.BlackKnightSymbol:
                piece_type = Piece.Knight;
                break;
            case Piece.WhiteBishopSymbol:
            case Piece.BlackBishopSymbol:
                piece_type = Piece.Bishop;
                break;
            case Piece.WhiteRookSymbol:
            case Piece.BlackRookSymbol:
                piece_type = Piece.Rook;
                break;
            case Piece.WhiteQueenSymbol:
            case Piece.BlackQueenSymbol:
                piece_type = Piece.Queen;
                break;
            case Piece.WhiteKingSymbol:
            case Piece.BlackKingSymbol:
                piece_type = Piece.King;
                break;
            default:
                piece_type = Piece.None;
                break;
        }

        return piece_type;
    }

    public value: number;

    /**
     * 
     * @param piece Piece type from 1 to 6.
     * @param color Color. If a boolean, true is black and false is white.
     */
    constructor(piece: 1 | 2 | 3 | 4 | 5 | 6, color: 0 | 8 | boolean) {
        if (typeof color === "boolean") {
            this.value = piece | (color ? Piece.Black : Piece.White);
        } else {
            this.value = piece | color;
        }
    }
}

export { type PieceColors };
export default Piece;
