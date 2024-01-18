import Piece, { type PieceColors } from "../../Piece";

type CastlingRights = Record<PieceColors, { [Piece.King]: boolean, [Piece.Queen]: boolean }>;

type GameStateObject = {
  /**
   * Whose turn it is {@link PieceColors}
   */
  active_color: PieceColors;
  /**
   * A record with the binary representation of the colors as its key.
   * See {@link PieceColors}.
   * 
   * Tells whether white's or black's king
   * can castle. If so, then the respective binary representations
   * of the {@link Piece.King} or {@link Piece.Queen} will hold true for either Kingside or Queenside.
   * 
   * For example:
   * 
   * ```ts
   * // White can castle kingside and black cannot castle on either sides.
   * // We encapsulate the keys in brackets since their values might change in the future. 
   * 
   * const castling_rights = {
   *   [White]: {
   *     [Piece.King]: true,
   *     [Piece.Queen]: false
   *   },
   *   [Black]: {
   *     [Piece.King]: false,
   *     [Piece.Queen]: false
   *   }
   * };
   * ```
   */
  castling_rights: CastlingRights;
  /**
   * At which indeces in the 8x8 chess board matrix is there a possible capture for En Passant
   */
  en_passant_indeces: number[][];
  /**
   * How many moves both player made since the last pawn advance or piece capture.
   * If 100 is reached, the game ends in a draw.
   */
  half_move_clock: number;
  /**
   * How many moves were made in total.
   * Incremented when black makes a move.
   */
  full_move_clock: number;

  /**
   * The board matrix filled with binary representations of each piece.
   */
  board: number[][];
};

// TODO: Implement the board to record the current placements on the board
class GameState {
    private _state: Partial<GameStateObject>;

    set_board(board: number[][]): this {
      if ("board" in this._state) {
        throw new Error("Board already set.");
      }

      this._state.board = board;

      return this;
    }

    /**
     * @param color 
     * @throws Error if the active color is already set.
     */
    set_active_color(color: PieceColors): this {
      if ("active_color" in this._state) {
        throw new Error("Active color already set.");
      }

      this._state.active_color = color;
  
      return this;
    }

    /**
     * @param castling_rights
     * @throws Error if the castling rights are already set.
     */
    set_castling_rights(castling_rights: CastlingRights): this {
      if ("castling_rights" in this._state) {
        if (this._state.castling_rights[0] && this._state.castling_rights[1]) {
          throw new Error("Castling rights already set.");
        }
      }

      this._state.castling_rights = castling_rights;
    
      return this;
    }

    /**
     * @param indeces 
     * @throws Error if the en passant indeces are already set.
     */
    set_en_passant_indeces(indeces: number[][]): this {
      if ("en_passant_indeces" in this._state) {
        throw new Error("En passant indeces already set.");
      }

      this._state.en_passant_indeces = indeces;

      return this;
    }

    /**
     * @param clock 
     * @throws Error if the half move clock is already set.
     */
    set_half_move_clock(clock: number): this {
      if ("half_move_clock" in this._state) {
        throw new Error("Half move clock already set.");
      }

      this._state.half_move_clock = clock;

      return this;
    }

    /**
     * @param clock 
     * @throws Error if the full move clock is already set.
     */
    set_full_move_clock(clock: number): this {
      if ("full_move_clock" in this._state) {
        throw new Error("Full move clock already set.");
      }

      this._state.full_move_clock = clock;

      return this;
    }

    /**
     * @returns The built {@link GameStateObject}
     * @throws Error if the {@link GameStateObject} is not fully built.
     */
    build(): GameStateObject {
      if (
        !("active_color" in this._state) &&
        !("castling_rights" in this._state) &&
        !("en_passant_indeces" in this._state) &&
        !("half_move_clock" in this._state) &&
        !("full_move_clock" in this._state)
      ) {
        throw new Error("GameState is not fully built.");
      }

      const tmp = this._state as GameStateObject;

      this._state = {};

      return tmp;
    }

    constructor() {
      this._state = {};
    }
}

export { type GameStateObject, type CastlingRights, GameState };
