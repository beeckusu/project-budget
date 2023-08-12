import { parseCSV, rowToTransaction } from "../../events/ParsingEvents";
import Transaction from "../../models/Transaction";

describe('parseCSV', () => {

    const rowToObject = (row) => {
        return 'mockedObject';
    }

    const testFileContents = async (contents, expectedResult) => {
        const blob = new Blob([contents]);
        const file = new File([blob], 'mockedFileName.csv', { type: 'text/csv' });

        await expect(parseCSV(file, rowToObject)).resolves.toStrictEqual(expectedResult);
    }

    const testCases = [
        { name: 'should parse single line', contents: 'MockedFileContents', expectedResult: ['mockedObject'] },
        { name: 'should parse multiple lines', contents: 'MockedFileContents\nMockedFileContents', expectedResult: ['mockedObject', 'mockedObject'] },
        { name: 'should parse empty file', contents: '', expectedResult: [] },
    ]

    testCases.forEach((testCase) => {
        it(testCase.name, async () => {
            await testFileContents(testCase.contents, testCase.expectedResult);
        });
    });

});

describe('rowToTransaction', () => {

    const testCases = [
        {
            name: 'convert to expense', row: [45132, "CAPTAIN'S BOIL", 100.00, null, 100.00],
            expectedResult: new Transaction('mockedId', "CAPTAIN'S BOIL", 100.00, new Date(2023, 6, 25, 20), 'EXPENSE')
        },
        {
            name: 'convert to deposit', row: [45132, "CAPTAIN'S BOIL", null, 100.00, 100.00],
            expectedResult: new Transaction('mockedId', "CAPTAIN'S BOIL", 100.00, new Date(2023, 6, 25, 20), 'DEPOSIT')
        },
    ]

    testCases.forEach((testCase) => {
        it(testCase.name, () => {

            let actualResult = rowToTransaction(testCase.row);
            let expectedResult = testCase.expectedResult;

            expect(actualResult.description).toBe(expectedResult.description);
            expect(actualResult.amount).toBe(expectedResult.amount);
            expect(actualResult.date).toStrictEqual(expectedResult.date);
            expect(actualResult.transactionType).toBe(expectedResult.transactionType);
        });
    });

});