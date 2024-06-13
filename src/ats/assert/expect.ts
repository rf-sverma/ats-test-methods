//@ts-nocheck
import { assert } from "chai";

/**
 * Type representing the assertion types supported by the pm.expect method.
 */
type AssertionType = 'string' | 'number' | 'boolean' | 'object' | 'array';

/**
 * Class representing assertion methods for different types of values.
 *
 * @typeparam T The type of the value being asserted.
 */
class Assertion<T extends object> {
    /** The value to be asserted. */
    value: T;

    /**
     * Constructs an Assertion instance with the given value.
     *
     * @param value - The value to be asserted.
     */
    constructor(value: T) {
        this.value = value;
    }

    /**
     * Asserts that the value is strictly equal to the expected value.
     *
     * @param expected - The expected value.
     * @throws Error if the value is not equal to the expected value.
     */
    equal(expected: T): void {
        console.log("EQUAL CHECK ",this.value);
        if (this.value !== expected) {
            throw new Error(`Expected ${this.value} to equal ${expected}`);
        }
    }

    /**
     * Asserts that the value deeply equals the expected value.
     *
     * @param expected - The expected value.
     * @throws Error if the value does not deeply equal the expected value.
     */
    eql(expected: T): void {
        if (JSON.stringify(this.value) !== JSON.stringify(expected)) {
            throw new Error(`Expected ${this.value} to deeply equal ${expected}`);
        }
    }

    /**
     * Asserts that the value is greater than the expected value.
     *
     * @param expected - The expected value.
     * @throws Error if the value is not above the expected value.
     */
    above(expected: number): void {
        if (typeof this.value !== 'number' || this.value <= expected) {
            throw new Error(`Expected ${this.value} to be above ${expected}`);
        }
    }

    /**
     * Asserts that the value is less than the expected value.
     *
     * @param expected - The expected value.
     * @throws Error if the value is not below the expected value.
     */
    below(expected: number): void {
        if (typeof this.value !== 'number' || this.value >= expected) {
            throw new Error(`Expected ${this.value} to be below ${expected}`);
        }
    }

    /**
     * Asserts that the type of the value matches the expected type.
     *
     * @param type - The expected type.
     * @throws Error if the type of the value does not match the expected type.
     */
    a(type: AssertionType): void {
        if (type === 'array' && !Array.isArray(this.value)) {
            throw new Error(`Expected ${this.value} to be an array`);
        }
        if (type !== 'array' && typeof this.value !== type) {
            throw new Error(`Expected ${this.value} to be a ${type}`);
        }
    }

    /**
     * Alias for `a` method.
     *
     * @param type - The expected type.
     * @throws Error if the type of the value does not match the expected type.
     */
    an(type: AssertionType): void {
        this.a(type);
    }

    /**
     * Asserts that the value includes the expected substring.
     *
     * @param substring - The expected substring.
     * @throws Error if the value does not include the expected substring.
     */
    include(substring: string): void {
        if (typeof this.value !== 'string' || !(this.value as string).includes(substring)) {
            throw new Error(`Expected ${this.value} to include ${substring}`);
        }
    }

    /**
     * Asserts that the length of the value matches the expected length.
     *
     * @param length - The expected length.
     * @throws Error if the length of the value does not match the expected length.
     */
    lengthOf(length: number): void {
        if ((typeof this.value === 'string' || Array.isArray(this.value)) && this.value.length !== length) {
            throw new Error(`Expected length ${this.value.length} to equal ${length}`);
        }
    }

    /**
     * Asserts that the value has the expected property, and optionally, that the property has the expected value.
     *
     * @typeparam K - The type of the property key.
     * @param name - The property name.
     * @param value - The expected property value (optional).
     * @throws Error if the value does not have the expected property or property value.
     */
    property<K extends keyof T>(name: K, value?: T[K]): void {
        if (!(name in this.value)) {
            throw new Error(`Expected ${this.value} to have property ${String(name)}`);
        }
        if (value !== undefined && this.value[name] !== value) {
            throw new Error(`Expected property ${String(name)} to equal ${value}`);
        }
    }

    // Additional methods to cover more assertion cases

    /**
     * Asserts that the value matches the provided regular expression.
     *
     * @param regex - The regular expression.
     * @throws Error if the value does not match the regular expression.
     */
    match(regex: RegExp): void {
        if (typeof this.value !== 'string' || !regex.test(this.value as string)) {
            throw new Error(`Expected ${this.value} to match ${regex}`);
        }
    }

    /**
     * Asserts that the array value contains the provided subset.
     *
     * @typeparam U - The type of the array elements.
     * @param subset - The expected subset.
     * @throws Error if the array value does not contain the expected subset.
     */
    contain<U extends T extends Array<infer U> ? U : never>(subset: U): void {
        if (!Array.isArray(this.value) || !(this.value as U[]).includes(subset)) {
            throw new Error(`Expected ${this.value} to contain ${subset}`);
        }
    }

    /**
     * Asserts that the object value contains the provided keys.
     *
     * @param keys - The expected keys.
     * @throws Error if the object value does not contain the expected keys.
     */
    keys(...keys: (keyof T)[]): void {
        if (typeof this.value !== 'object' || this.value === null) {
            throw new Error(`Expected ${this.value} to be an object`);
        }
        for (const key of keys) {
            if (!(key in this.value)) {
                throw new Error(`Expected ${this.value} to have key ${String(key)}`);
            }
        }
    }
}

// class CustomAssertion {
//     value: any;
//     constructor(value: any) {
//         this.value = value;
//     }

//     // Basic assertions
//     equal(expected: any) {
//         assert.strictEqual(this.value, expected, `Expected ${this.value} to equal ${expected}`);
//     }

//     eql(expected: any) {
//         assert.deepEqual(this.value, expected, `Expected ${this.value} to deeply equal ${expected}`);
//     }

//     above(expected: number) {
//         assert.isAbove(this.value, expected, `Expected ${this.value} to be above ${expected}`);
//     }

//     below(expected: number) {
//         assert.isBelow(this.value, expected, `Expected ${this.value} to be below ${expected}`);
//     }

//     a(type: string) {
//         if (type === 'array') {
//             assert.isArray(this.value, `Expected ${this.value} to be an array`);
//         } else {
//             assert.typeOf(this.value, type, `Expected ${this.value} to be a ${type}`);
//         }
//     }

//     an(type: any) {
//         this.a(type);
//     }

//     include(substring: any) {
//         assert.include(this.value, substring, `Expected ${this.value} to include ${substring}`);
//     }

//     lengthOf(length: number) {
//         assert.lengthOf(this.value, length, `Expected length ${this.value.length} to equal ${length}`);
//     }

//     property(name: string, value: undefined) {
//         if (value === undefined) {
//             assert.property(this.value, name, `Expected ${this.value} to have property ${name}`);
//         } else {
//             assert.propertyVal(this.value, name, value, `Expected property ${name} to equal ${value}`);
//         }
//     }

//     match(regex: RegExp) {
//         assert.match(this.value, regex, `Expected ${this.value} to match ${regex}`);
//     }

//     contain(subset: any) {
//         assert.include(this.value, subset, `Expected ${this.value} to contain ${subset}`);
//     }

//     keys(...keys: any[]) {
//         assert.hasAllKeys(this.value, keys, `Expected ${this.value} to have keys ${keys}`);
//     }

//     // Boolean assertions
//     true() {
//         assert.isTrue(this.value, `Expected ${this.value} to be true`);
//     }

//     false() {
//         assert.isFalse(this.value, `Expected ${this.value} to be false`);
//     }

//     // Number assertions
//     aboveOrEqual(expected: number) {
//         assert.isAtLeast(this.value, expected, `Expected ${this.value} to be above or equal to ${expected}`);
//     }

//     belowOrEqual(expected: number) {
//         assert.isAtMost(this.value, expected, `Expected ${this.value} to be below or equal to ${expected}`);
//     }

//     // Array assertions
//     length(length: number) {
//         assert.lengthOf(this.value, length, `Expected ${this.value} to have length ${length}`);
//     }

//     // Object assertions
//     empty() {
//         assert.isEmpty(this.value, `Expected ${this.value} to be empty`);
//     }

//     // String assertions
//     includeIgnoreCase(substring: string) {
//         assert.include(this.value.toLowerCase(), substring.toLowerCase(), `Expected ${this.value} to include ${substring} ignoring case`);
//     }

//     // Error assertions
//     error(expectedError: Chai.Constructor<unknown> | undefined) {
//         if (expectedError === undefined) {
//             assert.isOk(this.value instanceof Error, `Expected ${this.value} to be an error`);
//         } else {
//             assert.instanceOf(this.value, expectedError, `Expected ${this.value} to be an instance of ${expectedError}`);
//         }
//     }

//     // All .to methods
//     to = {
//         be: {
//             ok() {
//                 assert.isOk(this.value, `Expected ${this.value} to be truthy`);
//             },

//             true() {
//                 assert.isTrue(this.value, `Expected ${this.value} to be true`);
//             },

//             false() {
//                 assert.isFalse(this.value, `Expected ${this.value} to be false`);
//             },

//             null() {
//                 assert.isNull(this.value, `Expected ${this.value} to be null`);
//             },

//             undefined() {
//                 assert.isUndefined(this.value, `Expected ${this.value} to be undefined`);
//             },

//             NaN() {
//                 assert.isNaN(this.value, `Expected ${this.value} to be NaN`);
//             },
//         },

//         include: {
//             string(expected: any) {
//                 assert.include(this.value, expected, `Expected ${this.value} to include ${expected}`);
//             },

//             members(subset: unknown[]) {
//                 assert.includeMembers(this.value, subset, `Expected ${this.value} to include members of ${subset}`);
//             },

//             keys(...keys: any[]) {
//                 assert.includeAllKeys(this.value, keys, `Expected ${this.value} to include all keys ${keys}`);
//             },

//             any(keys: any) {
//                 assert.includeAnyKeys(this.value, keys, `Expected ${this.value} to include any key of ${keys}`);
//             },
//         },

//         have: {
//             any(keys: (string | Object)[] | { [key: string]: any; }) {
//                 assert.hasAnyKeys(this.value, keys, `Expected ${this.value} to have any key of ${keys}`);
//             },

//             all(keys: (string | Object)[] | { [key: string]: any; }) {
//                 assert.hasAllKeys(this.value, keys, `Expected ${this.value} to have all keys ${keys}`);
//             },
//         },

//         deep: {
//             equal(expected: any) {
//                 assert.deepEqual(this.value, expected, `Expected ${this.value} to deeply equal ${expected}`);
//             },

//             property(name: string, value: any) {
//                 assert.nestedPropertyVal(this.value, name, value, `Expected property ${name} of ${this.value} to equal ${value}`);
//             },
//         },
//     };
// }



export const expect = (data: any)=>{
    console.log("ASSERT EXPORT ");
    // can also export chai instance
    return new Assertion(data);
}