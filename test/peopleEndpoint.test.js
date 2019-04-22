'use strict';

const
    assert = require('chai').assert,
    fork = require('child_process').fork,
    validator = require('jsonschema').Validator,
    peopleSchema = require('./schema/people'),
    api = require('./helpers/api-helper'),
    expected = require('./expectedResults'),
    data = require('../src/data/people.json'),
    testData = require('../src/data/testData.js')

let apiUnderTest = null;

describe('People Endpoint API Tests', function () {
    this.timeout(10000);
    // before ((done) => {

    //     apiUnderTest = fork('../server',[],{
    //         stdio:'pipe'
    //     })
    //     apiUnderTest.on('error', error=>{
    //         console.log(error);
    //     })
    //     apiUnderTest.on('message', msg=>{
    //         if(msg.contains('Server running at')){
    //             console.log(msg);
    //             done();
    //         }
    //         else{
    //             console.log(msg);
    //         }
    //     })

    // });

    describe("General Tests", () => {
        describe("/getPeople Endpoint Tests", () => {
            var testDataSets = testData.getPeopleTests;
            testDataSets.forEach(function (x) {
                it(x.testName, async () => {
                    var variables = x.variables;
                    var actual = await api.getRequest("/getPeople", variables);
                    assert.equal(actual.statusCode, x.expectedResponse)
                    assert.deepEqual(actual.body, x.expectedResult);
                });
            });
            it('Ensures the GetPeople Endpoint returns data when a range is supplied', async () => {
                var variables = { fromId: '1', toId: '10' }
                const actual = await api.getRequest("/getPeople", variables);
                //should return 10 people from the API
                assert.equal(actual.statusCode, 200)
                assert.deepEqual(actual.body.length, 10);
            });
            it('Validates the resulting people json against a schema', async () => {
                const actual = await api.getRequest("/getPeople?fromId=0&toId=10");
                let val = new validator();
                let result = val.validate(actual.body, peopleSchema);
                assert.isTrue(result.valid, JSON.stringify(result.errors, null, 4));
            });
        });
        describe("/searchByName Endpoint Tests", () => {
            it('Happy Path Search By Name', async () => {
                for (var i = 0; i < data.length; i++) {
                    var firstName = data[i].firstName;
                    var lastName = data[i].lastName;
                    var actual = await api.getRequest("/searchByName?firstName=" + firstName + "&lastName=" + lastName);
                    assert.equal(actual.statusCode, 200)
                    var compare = await expected.people[i];
                    assert.deepEqual(actual.body[0], compare);
                }
            });
            var testDataSets = testData.searchByNameTests;
            testDataSets.forEach(function (x) {
                it(x.testName, async () => {
                    var variables = x.variables;
                    var actual = await api.getRequest("/searchByName", variables);
                    assert.equal(actual.statusCode, x.expectedResponse)
                    assert.deepEqual(actual.body, x.expectedResult);
                });
            });
        });
        describe("/getPeopleByState Endpoint Tests", () => {
            it('getPeopleByState Happy Path', async () => {
                var actual = await api.getRequest("/getPeopleByState/California");
                for (var key in actual.body) {
                    if (actual.hasOwnProperty(key)) {
                        //verify each item returned in the response have the value for state of California
                        assert.equal(actual.body[key]['state'], 'California')
                    }
                }
                //This verifies that the number of data entries is equal to the response
                //This test is failing because the get method only returns the first entry with the specified state
                assert.equal(actual.length, 56);
            });

            it('Validates the resulting people json against a schema', async () => {
                const actual = await api.getRequest("/getPeople?fromId=0&toId=10");
                let val = new validator();
                let result = val.validate(actual.body, peopleSchema);
                assert.isTrue(result.valid, JSON.stringify(result.errors, null, 4));
            });
        });
    });

    after((done) => {

        done();
    });
});