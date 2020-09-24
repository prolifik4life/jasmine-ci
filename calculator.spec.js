describe('calculator.js', function() {

    it('shoud add a number to total', function() {
        const calculator = new Calculator();
        calculator.add(6);
        expect(calculator.total).toBe(6);
    });

    it('shoud subtract a number from  total', function() {
        const calculator = new Calculator();
        calculator.total = 100;
        calculator.substract(10);
        expect(calculator.total).toBe(90);
    });

    it('should divide total by the number', function() {
        const calculator = new Calculator();
        calculator.total = 400;
        calculator.divide(4);
        expect(calculator.total).toBe(100);
    });

    it('should multiply total by a number', function() {
        const calculator = new Calculator();
        calculator.total = 5;
        calculator.multiply(5);
        expect(calculator.total).toBe(25);
    });

    it('should initialize total', function() {
        const calculator = new Calculator();
        expect(calculator.total).toBe(0);
    });

    it('handles divide by zero', function() {
        const calculator = new Calculator();
        calculator.total = 20;

        expect(function() {calculator.divide(0) }).toThrow();
        expect(function() {calculator.divide(0) }).toThrowError(Error);
        expect(function() {calculator.divide(0) }).toThrowError(Error, 'Cannot divide by zero.');
    });

    describe('get version', function() {
        it('fetches version from an external source', function(done) {
            const calculator = new Calculator();

            spyOn(window, 'fetch').and.returnValue(Promise.resolve(
                new Response('{"version": "0.1"}')
            ));
            calculator.version.then(function(data) {
                expect(data.version).toBe('0.1');

                done();
            });
        });
    });

    describe('get version with async and await', function() {
        it('fetches version from an external source', async function(done) {
            const calculator = new Calculator();

            spyOn(window, 'fetch').and.returnValue(Promise.resolve(
                new Response('{"version": "0.1"}')
            ));
            const data = await calculator.version;
            debugger
            expect(data.version).toBe('0.1');

            done();
        });
    });
});

