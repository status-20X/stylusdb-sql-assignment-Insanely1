const readCSV = require('../../src/csvReader');
const parseQuery = require('../../src/queryParser');

test('Read CSV File', async () => {
    const data = await readCSV('./sample.csv');
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(3);
    expect(data[0].name).toBe('John');
    expect(data[0].age).toBe('30'); //ignore the string type here, we will fix this later
});

// test('Parse SQL Query', () => {
//     const query = 'SELECT id, name FROM sample';
//     const parsed = parseQuery(query);
//     expect(parsed).toEqual({
//         fields: ['id', 'name'],
//         table: 'sample',
//         whereClause: null
//     });

// });

test('Parse SQL Query with Multiple WHERE Clauses', () => {
    const query = 'SELECT id, name FROM sample WHERE age = 30 AND name = John';
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'sample',
        whereClauses: [{
            "field": "age",
            "operator": "=",
            "value": "30",
        }, {
            "field": "name",
            "operator": "=",
            "value": "John",
        }]
    });
});

// test('Execute SQL Query with Multiple WHERE Clause', async () => {
//     const query = 'SELECT id, name FROM sample WHERE age = 30 AND name = John';
//     const result = await executeSELECTQuery(query);
//     expect(result.length).toBe(1);
//     expect(result[0]).toEqual({ id: '1', name: 'John' });
// });