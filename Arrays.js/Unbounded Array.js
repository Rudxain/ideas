/**
- Uses BigInts as indices
- has no empty slots, only `undefined` slots
- despite not having empty slots, it's internally sparse, therefore it uses minimal memory
- its iterator ignores all `undefined`s, for faster iteration
*/
class UnboundedArray {

}
