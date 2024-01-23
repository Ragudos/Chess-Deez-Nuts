import Piece from "./Piece";
import { FullGameStateObject, } from "./lib/helpers/GameState";

type Coordinates = [number, number];

class Board {
    public game_state: FullGameStateObject;
    
    constructor(game_state: FullGameStateObject) {
        this.game_state = game_state;
    }

    /**
     * @param piece 
     * @param from_position 
     * @param to_position
     * 
     * @throws Error if trying to move to a position containing a piece of the same color
     * 
     * uses {@link is_valid_position} for validation
     */
    move_piece(piece: number, from_position: Coordinates, to_position: Coordinates): void {
        if (!this.is_valid_position(piece, to_position)) {
            throw new Error("Invalid position");
        }

        if (!this.is_position_open(to_position)) {
            this.capture_piece(piece, this.game_state.board[to_position[0]][to_position[1]], to_position, from_position);
        } else {
            this.game_state.board[to_position[0]][to_position[1]] = piece;
            this.game_state.board[from_position[0]][from_position[1]] = Piece.None;
        }
    }

    get_possible_moves(_piece: number, _from_idx: number): void {
        this.game_state;
        throw new Error("Not implemented");
    }
    
    /**
     * @param prisoner_piece 
     * @param prosecutor_piece
     * @param prisoner_idx {@link Coordinates} [x, y] - Where the prisoner piece is located and prosectuor piece will go to.
     * @param prosecutor_idx {@link Coordinates} [x, y] - Where the prosecutor piece is located and came from
     * 
     * @throws Error if prisoner and prosecutor are of the same color or the values are not valid
     */
    capture_piece(prisoner_piece: number, prosecutor_piece: number, prisoner_position: Coordinates, prosecutor_position: Coordinates): void {
        if (prisoner_piece === 0 || prosecutor_piece === 0) {
            throw new Error("Invalid piece/s");
        }

        const is_prisoner_white = Piece.is_color_white(prisoner_piece);
        const is_prosecutor_white = Piece.is_color_white(prosecutor_piece);

        if (this.game_state.board[prisoner_position[0]][prisoner_position[1]] !== prisoner_piece) {
            throw new Error("Prisoner piece does not match board state");
        }

        if ((is_prisoner_white && is_prosecutor_white) || (!is_prisoner_white && !is_prosecutor_white)) {
            throw new Error("Cannot capture piece of same color");
        }

        if (Piece.King === Piece.get_type(prisoner_piece)) {
            throw new Error("Cannot capture king");
        }

        if (is_prosecutor_white) {
            this.game_state.captures[0][Piece.get_type(prisoner_piece)] += 1;
        } else {
            this.game_state.captures[1][Piece.get_type(prisoner_piece)] += 1;
        }

        this.game_state.board[prisoner_position[0]][prisoner_position[1]] = prosecutor_piece;
        this.game_state.board[prosecutor_position[0]][prosecutor_position[1]] = Piece.None;
    }

    is_position_open(position: Coordinates) {
        return this.game_state.board[position[0]][position[1]] === Piece.None;
    }

    /**
     * @param piece
     * @param idx {@link Coordinates} [x, y]
     * 
     * @throws Error if the piece is not a pawn
     */
    is_valid_position(piece: number, position: Coordinates) {
        if (position[0] < 0 || position[0] > 7 || position[1] < 0 || position[1] <= 7) {
            return false;
        }
        
        if (this.is_position_open(position)) {
            return true;
        }

        const piece_in_position = this.game_state.board[position[0]][position[1]];

        return Piece.is_color_white(piece) !== Piece.is_color_white(piece_in_position);
    }
}

export { Board };
