import { type GameStateObject, GameState, CastlingRights } from "./GameState";

/**
 * A FEN parser.
 * Also known as Forsyth-Edwards Notation.
 * This is used to describe a Chess game board/positions of pieces.
 */
class FenParser {
    private static _builder: GameState = new GameState();

    public static parseFenTxt(fenTxt: string): GameStateObject {
        const fenParts = fenTxt.split(" ");
        const fenBoard = fenParts[0];
        const fenActiveColor = fenParts[1];
        const fenCastlingRights = fenParts[2];
        const fenEnPassant = fenParts[3];
        const fenHalfMoveClock = fenParts[4];
        const fenFullMoveClock = fenParts[5];

        const board = FenParser.parseFenBoard(fenBoard);
        const activeColor = FenParser.parseFenActiveColor(fenActiveColor);
        const castlingRights = FenParser.parseFenCastlingRights(fenCastlingRights);
        const enPassant = FenParser.parseFenEnPassant(fenEnPassant);
        const halfMoveClock = FenParser.parseFenHalfMoveClock(fenHalfMoveClock);
        const fullMoveClock = FenParser.parseFenFullMoveClock(fenFullMoveClock);

        return FenParser._builder.set_board(board)
            .set_active_color(activeColor)
            .set_castling_rights(castlingRights)
            .set_en_passant_indeces(enPassant)
            .set_half_move_clock(halfMoveClock)
            .set_full_move_clock(fullMoveClock)
            .build();
    }

    /**
     * Parses the FEN board.
     * @param fenBoard 
     */
    private static parseFenBoard(fenBoard: string): number[][] {
        throw new Error("Not yet implemented.");
    }

    /**
     * Parses the FEN active color.
     * @param fenActiveColor 
     */
    private static parseFenActiveColor(fenActiveColor: string): PieceColors {
        throw new Error("Not yet implemented.");
    }

    /**
     * Parses the FEN castling rights.
     * @param fenCastlingRights 
     */
    private static parseFenCastlingRights(fenCastlingRights: string): CastlingRights{
        throw new Error("Not yet implemented.");
    }

    /**
     * Parses the FEN en passant.
     * @param fenEnPassant 
     */
    private static parseFenEnPassant(fenEnPassant: string): number[][] {
        throw new Error("Not yet implemented.");
    }

    /**
     * Parses the FEN half move clock.
     * @param fenHalfMoveClock 
     */
    private static parseFenHalfMoveClock(fenHalfMoveClock: string): number {
        throw new Error("Not yet implemented.");
    }

    /**
     * Parses the FEN full move clock.
     * @param fenFullMoveClock 
     */
    private static parseFenFullMoveClock(fenFullMoveClock: string): number {
        throw new Error("Not yet implemented.");
    }
}

export default FenParser;
