describe('main.js', function() {
    describe('calculate()', function() {
        it('validate expression when the first number is invalid', function() {
            spyOn(window, 'updateResult').and.stub();
            calculate('b+3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation is not recogized');
        });

        it('validate expression when the second number is invalid', function() {
            spyOn(window, 'updateResult'); // and.stub() is the default, can be omitted.
            calculate('3+a');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation is not recogized');
        });

        it('validate expression when operation is null', function() {
            spyOn(window, 'updateResult');
            calculate('3_a');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation is not recogized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('calls add', function(){
            const spy = spyOn(Calculator.prototype, 'add');

            calculate('5+4');
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith(4);
        });
        it('calls subtract', function() {
            const spy = spyOn(Calculator.prototype, 'substract');
            calculate('8-3');
            expect(spy).toHaveBeenCalledWith(3);
            expect(spy).not.toHaveBeenCalledWith(8);
        });
        it('calls multiply', function() {
            const spy = spyOn(Calculator.prototype, 'multiply');
            calculate('7*9');
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(9);
        });
        it('calls divide', function() {
            const spy = spyOn(Calculator.prototype, 'divide');
            calculate('4/3');
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(3);
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('calls updateResult (example using and.callThrough)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callThrough();

            calculate('5*5');
            expect(window.updateResult).toHaveBeenCalledWith(25);
        });
        it('calls updateResult (example using and.callFake)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callFake(function(number) {
                return 'it works'
            });

            calculate('5*5');
            expect(window.updateResult).toHaveBeenCalledWith('it works');
        });
        it('calls updateResult (example using and.returnValue)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.returnValue('it works');

            calculate('5*5');
            expect(window.updateResult).toHaveBeenCalledWith('it works');
        });
        it('calls updateResult (example using and.returnValues)', function() {
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'add').and.returnValues(null, 'it works');

            calculate('5+5');
            expect(window.updateResult).toHaveBeenCalledWith('it works');
        });
    });

    describe('updateResult()', function() {
        beforeAll(function() { 
            element = document.createElement('div');
            element.setAttribute('id', 'result');

            document.body.appendChild(element);
            this.element = element;
        });

        afterAll(function() {
            // const element = document.getElementById('result');
             document.body.removeChild(this.element);
        });

        it('adds result to the DOM', function() {
            updateResult('5');
            expect(this.element.innerText).toBe('5');
        });

    });

    describe('showVersion()', function() {
        it('calls calculator.version', function() {
            spyOn(document, 'getElementById').and.returnValue({
                innerText: null
            });
            const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
                // Promise.resolve(new Response('{"version":"0.1"}'))
                Promise.resolve()
            );
            showVersion();
            expect(spy).toHaveBeenCalled();
        });
    });
});