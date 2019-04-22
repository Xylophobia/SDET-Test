const expected = require('../../test/expectedResults');

var getPeopleTests = [
    { variables: { fromId: '1', toId: '10' }, expectedResponse: 200, expectedResult: expected.rangeFrom1To10, testName: 'Ensures the GetPeople Endpoint returns data when a range is supplied' },
    { variables: { fromId: '-5', toId: '5' }, expectedResponse: 200, expectedResult: expected.rangeFromNegative5To5, testName: 'Range using negative number' },
    { variables: { fromId: '5', toId: '25' }, expectedResponse: 200, expectedResult: expected.rangeFrom5To25, testName: 'Valid Range starting at 5 ending at 25' },
    { variables: { fromId: 5, toId: 25 }, expectedResponse: 200, expectedResult: expected.rangeFrom5To25, testName: 'Setting variables to ints starting at 5 ending at 25' },
    { variables: { fromId: '10', toId: '1' }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: 'Higher number in fromID than toID' },
    { variables: { fromId: 'Test', toId: 'Data' }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: 'String using Latin Characters' },
    { variables: { fromId: 'テスト', toId: '日本人' }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: 'String using Double Typed Characters' },
    { variables: { fromId: 'للعلاقة', toId: 'وضع' }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: 'String using RTL Characters' },
    { variables: { fromId: '👩🏿', toId: '👩🏿' }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: 'String using Unicode Characters (emoji)' },
    { variables: { fromId: '', toId: '' }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: 'Empty strings for both fromID and toID' },
    { variables: { fromId: '', toId: '10' }, expectedResponse: 200, expectedResult: expected.rangeFrom1To10, testName: 'Empty string for fromID and valid string from toID' },
    { variables: { fromId: '10', toId: '' }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: 'Empty string for toID and valid string from fromID' },
    { variables: { fromId: '5' }, expectedResponse: 400, expectedResult: expected.invalidRequest, testName: 'Ensuring correct response when only fromID is passed' },
    { variables: { toId: '5' }, expectedResponse: 400, expectedResult: expected.invalidRequest, testName: 'Ensuring correct response when only toID is passed' },
    { variables: {}, expectedResponse: 400, expectedResult: expected.invalidRequest, testName: 'Ensuring correct response when no parameters are passed' },
    { variables: { fromId: { name: "Bob", pet: "cat" }, toId: { name: "Mary", pet: "dog" } }, expectedResponse: 400, expectedResult: expected.invalidRequest, testName: 'Ensuring correct response when only fromID and toID set to objects' },
    { variables: { fromId: undefined, toId: undefined }, expectedResponse: 400, expectedResult: expected.invalidRequest, testName: 'Ensuring correct response when only fromID and toID set to undefined' },
    { variables: { fromId: null, toId: null }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: 'Ensuring correct response when only fromID and toID set to null' }
]

var searchByNameTests = [
    { variables: { firstName: '', lastName: '' }, expectedResponse: 200, expectedResult: expected.people, testName: '/searchByName with empty strings' },
    { variables: { firstName: '', lastName: 'Pigne' }, expectedResponse: 200, expectedResult: expected.oneNameOnly, testName: '/searchByName with empty string for firstName and valid lastName' },
    { variables: { firstName: '', lastName: 'st' }, expectedResponse: 200, expectedResult: expected.partialLastName, testName: '/searchByName with empty string for firstName and partial lastName' },
    { variables: { firstName: 'g', lastName: 'st' }, expectedResponse: 200, expectedResult: expected.partialFirstAndLastName, testName: '/searchByName with partial firstName and partial lastName' },
    { variables: { firstName: 'Juliette', lastName: '' }, expectedResponse: 200, expectedResult: expected.oneNameOnly, testName: '/searchByName with empty string for firstName and valid lastName' },
    { variables: { firstName: 'テスト', lastName: '日本人' }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: '/searchByName String using Double Typed Characters' },
    { variables: { firstName: 'للعلاقة', lastName: 'وضع' }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: '/searchByName String using RTL Characters' },
    { variables: { firstName: '👩🏿', lastName: '👩🏿' }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: '/searchByName String using Unicode Characters (Emoji)' },
    { variables: { firstName: 1, lastName: 23 }, expectedResponse: 200, expectedResult: expected.emptyResult, testName: '/searchByName using ints' },
    { variables: { firstName: null, lastName: null }, expectedResponse: 200, expectedResult: expected.people, testName: '/searchByName with firstName and lastName set to null' },
    { variables: {}, expectedResponse: 400, expectedResult: expected.invalidRequest, testName: '/searchByName without firstName or lastName name variables' },
    { variables: { firstName: '' }, expectedResponse: 400, expectedResult: expected.invalidRequest, testName: '/searchByName without lastName name variable' },
    { variables: { lastName: '' }, expectedResponse: 400, expectedResult: expected.invalidRequest, testName: '/searchByName without firstName name variable' },
    { variables: { firstName: undefined, lastName: undefined }, expectedResponse: 400, expectedResult: expected.invalidRequest, testName: '/searchByName with firstName and lastName set to undefined' },
    { variables: { firstName: { name: "Bob", pet: "cat" }, lastName: { name: "Mary", pet: "dog" } }, expectedResponse: 400, expectedResult: expected.invalidRequest, testName: '/searchByName with firstName and lastName set to objects' }
]

module.exports = {
    getPeopleTests,
    searchByNameTests
};
