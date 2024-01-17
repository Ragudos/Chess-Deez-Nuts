import Piece, { type PieceColors } from "../../Piece";

type GameStateObject = {
  /**
   * Whose turn it is
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
   * // We use arrays since their values might change in the future. 
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
  castling_rights: Record<PieceColors, { [Piece.King]: boolean, [Piece.Queen]: boolean }>;
};

// TODO: Implement the board to record the current placements on the board
class GameState {
    private _state: Partial<GameStateObject>;

    set_active_color(color: PieceColors): void {
      this._state.active_color = color;
    }

    build(): GameStateObject {
      if (
        !("active_color" in this._state)
      ) {
        return;
      }

      const tmp = this._state as GameStateObject;

      this._state = {};

      return tmp;
    }

    constructor() {
      this._state = {};
    }
}

export { type GameStateObject };
export default GameState;
