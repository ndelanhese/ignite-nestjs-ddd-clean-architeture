import { Left, Right } from "./either";

export type Either<L, R> = Left<L, R> | Right<L, R>;
