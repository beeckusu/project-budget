import { fetchChartData } from '../../utils/ChartUtils';


describe('ChartUtils', () => {

    const testCases = [
        {
            name: 'positive_control',
            transactions: [{ amount: 100, date: new Date(2021, 1, 1) }],
            expectedResult: [{ key: 'Mon Feb 01 2021', Total: 100 }]
        },
        {
            name: 'negative_control',
            transactions: [],
            expectedResult: []
        },
        {
            name: 'two_transactions_same_day',
            transactions: [
                { amount: 100, date: new Date(2021, 1, 1) },
                { amount: 200, date: new Date(2021, 1, 1) }
            ],
            expectedResult: [{ key: 'Mon Feb 01 2021', Total: 300 }]
        },
        {
            name: 'two_transactions_different_day',
            transactions: [
                { amount: 100, date: new Date(2021, 1, 1) },
                { amount: 200, date: new Date(2021, 1, 2) }
            ],
            expectedResult: [
                { key: 'Mon Feb 01 2021', Total: 100 },
                { key: 'Tue Feb 02 2021', Total: 200 }
            ]
        },
        {
            name: 'two_transactions_different_spaced_day',
            transactions: [
                { amount: 100, date: new Date(2021, 1, 1) },
                { amount: 200, date: new Date(2021, 1, 3) }
            ],
            expectedResult: [
                { key: 'Mon Feb 01 2021', Total: 100 },
                { key: 'Tue Feb 02 2021', Total: 0 },
                { key: 'Wed Feb 03 2021', Total: 200 }
            ]
        }
    ]

    testCases.forEach((testCase) => {
        it(testCase.name, () => {

            let actualResult = fetchChartData(testCase.transactions);
            let expectedResult = testCase.expectedResult;

            expect(actualResult).toStrictEqual(expectedResult);
        });
    });


});
