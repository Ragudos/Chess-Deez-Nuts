import { Board } from "../../Board";
import Piece, { PieceColors } from "../../Piece";
import { type GameStateObject, GameState, CastlingRights, EnPassant } from "./GameState";

/**
 * A FEN parser.
 * Also known as Forsyth-Edwards Notation.
 * This is used to describe a Chess game board/positions of pieces.
 */
class FenParser {
    private static _builder: GameState = new GameState();

    public static parse_fen_txt(fen_txt: string): GameStateObject {
        const fen_parts = fen_txt.split(" ");
        const fen_board = fen_parts[0];
        const fen_active_color = fen_parts[1];
        const fen_castling_rights = fen_parts[2];
        const fen_en_passant = fen_parts[3];
        const fen_half_move_clock = fen_parts[4];
        const fen_full_move_clock = fen_parts[5];

        const board = FenParser._parse_fen_board(fen_board);
        const active_color = FenParser._parse_fen_active_color(fen_active_color);
        const castlingRights = FenParser._parse_fen_castling_rights(fen_castling_rights);
        const en_passant = FenParser._parse_fen_en_passant(fen_en_passant);
        const half_move_clock = FenParser._parse_fen_half_move_clock(fen_half_move_clock);
        const full_move_clock = FenParser._parse_fen_full_move_clock(fen_full_move_clock);

        return FenParser._builder.set_board(board)
            .set_active_color(active_color)
            .set_castling_rights(castlingRights)
            .set_en_passant_indeces(en_passant)
            .set_half_move_clock(half_move_clock)
            .set_full_move_clock(full_move_clock)
            .build();
    }

    /**
     * Parses the FEN board.
     * @param fen_board 
     */
    private static _parse_fen_board(fen_board: string): number[][] {
        const split_board = fen_board.split("/");
        const board: number[][] = [];

        for (let y = 0; y < split_board.length; ++y) {
            const col = split_board[y];

            if (!col) {
                continue;
            }

            const row: number[] = [];

            for (let x = 0; x < col.length; ++x) {
                const char = col[x];

                if (char === undefined) {
                    continue;
                }

                const parsed_char = parseInt(char);

                if (isNaN(parsed_char)) {
                    const piece = Piece.get_piece_binary_from_symbol(Symbol.for(char));

                    if (piece === Piece.None) {
                        throw new Error("Invalid piece symbol.");
                    }

                    row.push(piece);
                } else {
                    for (let i = 0; i < parsed_char; ++i) {
                        row.push(Piece.None);
                    }
                }
            }

            board.push(row);
        }

        return board;
    }

    /**
     * Parses the FEN active color.
     * @param fen_active_color 
     */
    private static _parse_fen_active_color(fen_active_color: string): PieceColors {
        return fen_active_color === "w" ? Piece.White : Piece.Black;
    }

    /**
     * Parses the FEN castling rights.
     * @param fen_castling_rights 
     */
    private static _parse_fen_castling_rights(fen_castling_rights: string): CastlingRights {
        return {
            [Piece.Black]: {
                [Piece.King]: fen_castling_rights.includes("k"),
                [Piece.Queen]: fen_castling_rights.includes("q")
            },
            [Piece.White]: {
                [Piece.King]: fen_castling_rights.includes("K"),
                [Piece.Queen]: fen_castling_rights.includes("Q")
            }
        };
    }

    /**
     * Parses the FEN en passant.
     * @param fen_en_passant 
     * @throws Error if the en passant is invalid.
     */
    private static _parse_fen_en_passant(fen_en_passant: string): EnPassant {
        if (fen_en_passant === "-") {
            return undefined;
        }

        if (fen_en_passant.length !== 2) {
            throw new Error("Invalid en passant.");
        }

        const x = Board.ROW_LETTER_TO_INDEX[fen_en_passant[0]];
        const unparsed_y = fen_en_passant[1];

        if (x === undefined || unparsed_y === undefined) {
            throw new Error("Invalid en passant.");
        } 

        const y = parseInt(unparsed_y) - 1;

        if (isNaN(y)) {
            throw new Error("Invalid en passant.");
        }

        return { x, y };
    }

    /**
     * Parses the FEN half move clock.
     * @param fen_half_move_clock 
     */
    private static _parse_fen_half_move_clock(fen_half_move_clock: string): number {
        return parseInt(fen_half_move_clock);
    }

    /**
     * Parses the FEN full move clock.
     * @param fen_full_move_clock 
     */
    private static _parse_fen_full_move_clock(fen_full_move_clock: string): number {
        return parseInt(fen_full_move_clock);
    }
}

export default FenParser;
