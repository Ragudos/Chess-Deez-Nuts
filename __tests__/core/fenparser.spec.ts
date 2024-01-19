import Chess from "../../core/build";

const fen_string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b - - 0 0";

test(`Fen parser properly parses the board of the fen string: ${fen_string}.`, () => {
    const FenParser = Chess.FenParser;

    const parsed_fen_string = FenParser.parse_fen_txt(fen_string);
    const board = parsed_fen_string.board;

    expect(board.length).toBe(8);
    
    for (let y = 0; y < board.length; ++y) {
        const row = board[y];

        if (!row) {
            continue;
        }

        expect(row.length).toBe(8);

        for (let x = 0; x < row.length; ++x) {
            const piece = row[x];

            if (!piece) {
                continue;
            }

            if (y === 0) {
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
            } else if (y === 1) {
                expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.WhitePawnSymbol);
            } else if (y === 6) {
                expect(Chess.Piece.get_symbol(piece)).toBe(Chess.Piece.BlackPawnSymbol);
            } else if (y === 7) {
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
