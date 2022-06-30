test('common plus', () => {
    expect(2 + 2).toBe(4)
    expect(2 + 2).not.toBe(5)
})

test('to be true or false', () => {
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})

test('object', () => {
    expect({name:'jiangjiang'}).toEqual({name:'jiangjiang'})
})
