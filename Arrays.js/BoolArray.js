/*
polyfill for the potentially-future Boolean TypedArray.

code based on the ECMAScript spec, not real-life polyfills.

I'll make this work properly as a polyfill, but later
*/

(function(){'use strict';
	const TypeErr = TypeError, RangeErr = RangeError, trunc = Math.trunc,
		getter = DataView.prototype.getUint8,
		setter = DataView.prototype.setUint8,
		mapper = Array.prototype.map,
		MAX = Number.MAX_SAFE_INTEGER,
		TypedArray = Reflect.getPrototypeOf(Int8Array)
	const toIndex = x => {
		x = trunc(x) || 0
		if (x >= 0 && x <= MAX) return x
		throw new RangeErr('invalid index')
	}
	const IntegerIndexedObjectCreate = function(prototype) {}
	const GetPrototypeFromConstructor = function(constructor, intrinsicDefaultProto) {}
	const AllocateTypedArrayBuffer = function(O, length) {}
	const AllocateTypedArray = function(constructorName, newTarget, defaultProto, length) {
		let proto = GetPrototypeFromConstructor(newTarget, defaultProto)
		const obj = IntegerIndexedObjectCreate(proto)
		obj.TypedArrayName = constructorName
		obj.ContentType = Boolean
		if (length === undefined) obj.ByteLength = obj.ByteOffset = obj.ArrayLength = 0
		else AllocateTypedArrayBuffer(obj, length)
		return obj
	}
	const InitializeTypedArrayFromTypedArray = function(O, srcArray) {}

	/**
	Short edition of `defineProperty`
	@param {object} O
	@param {PropertyKey} p
	@param {*} v value to set
	@param {(boolean[]|number|bigint|string)} a bool descriptor with format [W, E, C]
	*/
	const defProp = (O, p, v, a) => {
		switch (typeof a) {
			case 'number': a &= 7; a = [a & 4, a & 2, a & 1]; break
			case 'bigint': a &= 7n; a = [a & 4n, a & 2n, a & 1n]; break
			case 'string': a = [/w/i.test(a), /e/i.test(a), /c/i.test(a)]; break
			//Linux chmod lol (rwx)
		}
		return Object.defineProperty(O, p, {value: v,
			writable: !!a[0], enumerable: !!a[1], configurable: !!a[2]})
	}

	defProp(DataView.prototype, 'getBool',
		function getBool(bitOffset) {
			bitOffset = toIndex(bitOffset)
			return !!(getter.call(this, bitOffset / 8) & (0x80 >> (bitOffset & 7)))
		},
		5 // same descriptor as similar methods
	)
	defProp(DataView.prototype, 'setBool',
		function setBool(bitOffset, value) {
			bitOffset = toIndex(bitOffset)
			const byteOffset = trunc(bitOffset / 8),
				byte = getter.call(this, byteOffset)
			bitOffset &= 7
			if (!!(byte & (0x80 >> bitOffset)) != !!value)
				setter.call(this, byteOffset, byte ^ (0x80 >> bitOffset))
			return
		},
		5
	)

	class BoolArray extends TypedArray {
		//https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-constructors
		constructor(...args) {
			const constructorName = 'BoolArray'
			const proto = TypedArray.prototype
			const numberOfArgs = args.length
			if (!numberOfArgs) return AllocateTypedArray(constructorName, NewTarget, proto, 0)
			const firstArgument = args[0]
			if (typeof firstArgument == 'object') {
				const O = AllocateTypedArray(constructorName, NewTarget, proto)
				if (Object.hasOwn(firstArgument, 'TypedArrayName')) InitializeTypedArrayFromTypedArray(O, firstArgument)
			}
		}

		get(bitOffset) {return (new DataView(this.buffer)).getBool(bitOffset)}
		set(bitOffset, value) {return (new DataView(this.buffer)).setBool(bitOffset, value)}

		static from(obj, func, thisObj) {
			if (typeof this != 'function' || (new this(0)) == null) throw new TypeErr('`this` is not a constructor')
			if (this.prototype !== BoolArray.prototype) throw new TypeErr('`this` is not BoolArray')

			func ||= function(_) {return _}
			if (typeof func != 'function') throw new TypeErr('specified argument is not a function')

			obj = Object(obj)
			if (!obj.length) return new this(0)
			let copy = []
			for (let i = 0; i < obj.length; i++) copy[copy.length] = obj[i]

			copy = mapper.call(copy, func, thisObj)
			const typed_arr = new this(copy.length)
			for (let i = 0; i < typed_arr.length; i++) typed_arr.set(i, copy[i])
			return typed_arr
		}
	}
	defProp(BoolArray, 'BYTES_PER_ELEMENT', 1 / 8, 0)
	defProp(globalThis, 'BoolArray', BoolArray, 5)
})()
