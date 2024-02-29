const mockedData = new Map();
const view1 = [
    ['apple', 'banana', 'cherry'],
    ['dog', 'elephant', 'fox'],
    ['green', 'blue', 'red']
]
const view2 = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
]
const allowedLoadedDirectories = [
    'data/stars/stardata.csv', 'data/malformed/malformed_signs.csv',
    'data/census/dol_ri_earnings_disparity.csv', 
    'data/income_by_race.csv',
    'data/postsecondary_education.csv'
]
const searchResults = [
    ['dog', 'cat', 'frog'],
    ['bat', 'dog', 'ant'],
    ['goat', 'bird', 'dog']
]

mockedData.set("view1", view1);
mockedData.set("view2", view2);
mockedData.set("load", allowedLoadedDirectories)

export function MockedData(){
    return mockedData
}