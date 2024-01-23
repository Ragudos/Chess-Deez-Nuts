import Piece, { type PieceColors } from "../../Piece";

type CastlingRights = Record<PieceColors, { [Piece.King]: boolean, [Piece.Queen]: boolean }>;
type EnPassant = undefined | { x: number, y: number };
type Captures = Record<PieceColors, Record<1 | 2 | 3 | 4 | 5, number>>;

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
   * At which index in the 8x8 chess board matrix is there a possible capture for En Passant
   */
  en_passant: EnPassant;
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

type FullGameStateObject = GameStateObject & {
  /**
   * The captures made by both white and black. These contains the binary representations of the pieces as the key and an integer of how many
   * of its kind was captured. {@link Captures}
   */
  captures: Captures; 

  /**
   * The history of moves made in the game.
   * A string of chess notations.
   */
  move_history: string[];
};

export { type GameStateObject, type CastlingRights, type EnPassant, type FullGameStateObject };
