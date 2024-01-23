type PieceColors = typeof Piece.White | typeof Piece.Black;
type PieceTypes = typeof Piece.Pawn | typeof Piece.Knight | typeof Piece.Bishop | typeof Piece.Rook | typeof Piece.Queen | typeof Piece.King;

/**
 * A chess piece. We use a binary representation of the pieces on a chess board
 * for less memory usage.
 */
class Piece {
    // Piece Symbols
    public static readonly NoneSymbol = Symbol.for(" ");
    public static readonly WhitePawnSymbol = Symbol.for("P");
    public static readonly WhiteKnightSymbol = Symbol.for("N");
    public static readonly WhiteBishopSymbol = Symbol.for("B");
    public static readonly WhiteRookSymbol = Symbol.for("R");
    public static readonly WhiteQueenSymbol = Symbol.for("Q");
    public static readonly WhiteKingSymbol = Symbol.for("K");
    public static readonly BlackPawnSymbol = Symbol.for("p");
    public static readonly BlackKnightSymbol = Symbol.for("n");
    public static readonly BlackBishopSymbol = Symbol.for("b");
    public static readonly BlackRookSymbol = Symbol.for("r");
    public static readonly BlackQueenSymbol = Symbol.for("q");
    public static readonly BlackKingSymbol = Symbol.for("k");

    // Piece Types
    public static readonly None = 0;
    public static readonly Pawn = 1;
    public static readonly Knight = 2;
    public static readonly Bishop = 3;
    public static readonly Rook = 4;
    public static readonly Queen = 5;
    public static readonly King = 6;
    
    // Array of piece types
    public static readonly PieceTypes = [
        Piece.None,
        Piece.Pawn,
        Piece.Knight,
        Piece.Bishop,
        Piece.Rook,
        Piece.Queen,
        Piece.King
    ];

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

    public static get_piece_binary_from_symbol(symbol: symbol): number {
        let piece_type: number;

        switch(symbol) {
            case Piece.WhitePawnSymbol:
                piece_type = Piece.WhitePawn;
                break;
            case Piece.BlackPawnSymbol:
                piece_type = Piece.BlackPawn;
                break;
            case Piece.WhiteKnightSymbol:
                piece_type = Piece.WhiteKnight;
                break;    
            case Piece.BlackKnightSymbol:
                piece_type = Piece.BlackKnight;
                break;
            case Piece.WhiteBishopSymbol:
                piece_type = Piece.WhiteBishop;
                break;
            case Piece.BlackBishopSymbol:
                piece_type = Piece.BlackBishop;
                break;
            case Piece.WhiteRookSymbol:
                piece_type = Piece.WhiteRook;
                break;
            case Piece.BlackRookSymbol:
                piece_type = Piece.BlackRook;
                break;
            case Piece.WhiteQueenSymbol:
                piece_type = Piece.WhiteQueen;
                break;
            case Piece.BlackQueenSymbol:
                piece_type = Piece.BlackQueen;
                break;
            case Piece.WhiteKingSymbol:
                piece_type = Piece.WhiteKing;
                break;
            case Piece.BlackKingSymbol:
                piece_type = Piece.BlackKing;
                break;
            default:
                piece_type = Piece.None;
                break;
        }

        return piece_type;
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

export { type PieceColors, type PieceTypes };
export default Piece;
