import Chess from "../../core/build";

const fen_string_base = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b - - 0 0";

test(`Fen parser properly parses the default state: ${fen_string_base}.`, () => {
    const FenParser = Chess.FenParser;

    const parsed_fen_string = FenParser.parse_fen_txt(fen_string_base);
    const castling_rights = parsed_fen_string.castling_rights;
    const en_passant = parsed_fen_string.en_passant;
    const board = parsed_fen_string.board;

    expect(castling_rights[0][5]).toBeFalsy();
    expect(castling_rights[0][6]).toBeFalsy();
    expect(castling_rights[1][5]).toBeFalsy();
    expect(castling_rights[1][6]).toBeFalsy();
    
    expect(en_passant).toBeUndefined();

    expect(parsed_fen_string.full_move_clock).toBe(0);
    expect(parsed_fen_string.half_move_clock).toBe(0);

    expect(board.length).toBe(8);
    
    for (let y = 0; y < board.length; ++y) {
        const row = board[y];

        expect(row).not.toBeUndefined();

        if (!row) {
            continue;
        }

        expect(row.length).toBe(8);

        for (let x = 0; x < row.length; ++x) {
            const piece = row[x];

            if (!piece) {
                continue;
            }

            if (y === 7) {
                if (x === 0 || x === 7) {
                    expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.WhiteRookSymbol);
                }

                if (x === 1 || x === 6) {
                    expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.WhiteKnightSymbol);
                }

                if (x === 2 || x === 5) {
                    expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.WhiteBishopSymbol);
                }

                if (x === 3) {
                    expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.WhiteQueenSymbol);
                }

                if (x === 4) {
                    expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.WhiteKingSymbol);
                }
            } else if (y === 6) {
                expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.WhitePawnSymbol);
            } else if (y === 1) {
                expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.BlackPawnSymbol);
            } else if (y === 0) {
                if (x === 0 || x === 7) {
                    expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.BlackRookSymbol);
                }

                if (x === 1 || x === 6) {
                    expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.BlackKnightSymbol);
                }

                if (x === 2 || x === 5) {
                    expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.BlackBishopSymbol);
                }

                if (x === 3) {
                    expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.BlackQueenSymbol);
                }

                if (x === 4) {
                    expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.BlackKingSymbol);
                }
            } else {
                expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.NoneSymbol);
            }
        }
    }
});
