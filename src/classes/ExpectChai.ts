
//@ts-nocheck
import { expect } from 'chai';

/**
 * Type representing the assertion types supported by the pm.expect method.
 */
type AssertionType = 'string' | 'number' | 'boolean' | 'object' | 'array';

/**
 * A namespace representing the pm object in Postman scripts.
 */
const pm = {
    /**
     * Creates an instance of Assertion for the provided value.
     *
     * @param value - The value to be asserted.
     * @returns An instance of Chai's expect function.
     */
    expect<T>(value: T): Chai.Assertion {
        return expect(value);
    }
};

// Usage example
// const value: number = 42;
// pm.expect(value).to.be.a('number');
