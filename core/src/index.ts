import Piece from "./Piece";
import Constants from "./lib/helpers/Constants";
import FenParser from "./lib/helpers/FenParser";

export default class Chess {
    public static readonly Constants = Constants;
    public static readonly FenParser = FenParser;
    public static readonly Piece = Piece;
}
