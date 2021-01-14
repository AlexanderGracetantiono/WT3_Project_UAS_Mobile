// EXAMPLE To call the function
// generateParams({
//     selects: [
//         'MAREA_ID',
//         'MAREA_CODE',
//         'MAREA_STATUS',
//         'MAREA_TEXT_EN',
//         'MAREA_TEXT_FR',
//     ],
//     limit: 1,
//     offset: 0,
//     first_row: true,
//     orders: {
//         field: 'MAREA_ID',
//         type: 'ASC' || 'DESC'
//     },
//     condition: [
//         {
//             field: 'MAREA_ID',
//             operator: '=',
//             value: [
//                 '1',
//                 '2'
//             ]
//         },
//         {
//             field: 'MAREA_MOA',
//             operator: '<',
//             value: [
//                 '1'
//             ]
//         },
//         {
//             field: 'MAREA_TEST',
//             operator: '>',
//             value: [
//                 '1',
//                 '3',
//                 '4'
//             ]
//         }
//     ]
// })

/**
 * This function is used to generate the params needed by API
 * while passing a more structured data
 */
export default ({
    selects = null,
    limit = null,
    offset = null,
    is_find = null,
    orders = {
        field: null,
        type: null
    },
    conditions = {
        field: null,
        operator: null,
        value: null
    }
}) => {
    let generatedParams = ''
    if (selects !== null) {
        if (Array.isArray(selects)) {
            selects.map((item, index) => {
                if (generatedParams == '') generatedParams += `selects[${index}]=${item}`
                else generatedParams += `&selects[${index}]=${item}`
            })
        }
        else {
            if (generatedParams == '') generatedParams += `selects[0]=${selects}`
            else generatedParams += `&selects[0]=${selects}`
        }
    }
    if (limit !== null) {
        if (generatedParams == '') generatedParams += `limit=${limit}`
        else generatedParams += `&limit=${limit}`
    }
    if (offset !== null) {
        if (generatedParams == '') generatedParams += `offset=${offset}`
        else generatedParams += `&offset=${offset}`
    }
    if (is_find !== null) {
        if (generatedParams == '') generatedParams += `is_find=${is_find}`
        else generatedParams += `&is_find=${is_find}`
    }
    if (orders.field !== null) {
        if (Array.isArray(orders)) {
            orders.map((item, index) => {
                if (generatedParams == '') generatedParams += `orders[${index}][field]=${item.field}`
                else generatedParams += `&orders[${index}][field]=${item.field}`

                generatedParams += `&orders[${index}][type]=${item.type}`
            })
        }
        else {
            if (generatedParams == '') generatedParams += `orders[0][field]=${orders.field}`
            else generatedParams += `&orders[0][field]=${orders.field}`

            generatedParams += `&orders[0][type]=${orders.type}`
        }
    }
    if (conditions.field !== null) {
        let conditionCounter = 0
        if (Array.isArray(conditions)) {
            conditions.map((item, index) => {
                const { field, operator, value } = item
                if (Array.isArray(value)) {
                    value.map(item => {
                        if (generatedParams == '') generatedParams += `conditions[${conditionCounter}][field_name]=${field}`
                        else generatedParams += `&conditions[${conditionCounter}][field_name]=${field}`

                        generatedParams += `&conditions[${conditionCounter}][operator]=${operator}`
                        generatedParams += `&conditions[${conditionCounter}][value]=${item}`

                        conditionCounter++
                    })
                }
                else {
                    if (generatedParams == '') generatedParams += `conditions[${conditionCounter}][field_name]=${field}`
                    else generatedParams += `&conditions[${conditionCounter}][field_name]=${field}`

                    generatedParams += `&conditions[${conditionCounter}][operator]=${operator}`
                    generatedParams += `&conditions[${conditionCounter}][value]=${value}`

                    conditionCounter++
                }
            })
        }
        else {
            if (generatedParams == '') generatedParams += `conditions[${conditionCounter}][field_name]=${conditions.field}`
            else generatedParams += `&conditions[${conditionCounter}][field_name]=${conditions.field}`

            generatedParams += `&conditions[${conditionCounter}][operator]=${conditions.operator}`
            generatedParams += `&conditions[${conditionCounter}][value]=${conditions.value}`
        }
    }

    return generatedParams
}