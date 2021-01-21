export default async (update, API, requestType = 'GET', post_data = null, params_data = null, debugMode = false) => {
    let token = ''
    return fetch(`${API}${params_data ? `?${encodeURI(params_data)}` : ``}`, {
        method: requestType,
        headers: post_data ?
            {
                'pos-mms-api-key': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'application-key': 'XtQdp4sr0tfjZUmVY4FD'
            } :
            {
                'pos-mms-api-key': token,
                'application-key': 'XtQdp4sr0tfjZUmVY4FD'
            },
        body: post_data ? JSON.stringify(post_data) : ''
    })
        .then((response) => {
            const statusCode = response.status;
            if (debugMode) {
                response.text().then(res => {
                    console.dir(res)
                    console.log({
                        API: `${API}${params_data ? `?${params_data}` : ``}`,
                        statusCode,
                        post_data
                    })
                })
            }
            const res = response.json()
            return Promise.all([statusCode, res])
        })
        .then(([statusCode, result]) => {
            update(
                {
                    "status": statusCode,
                    "result": result,
                    "isCache": false
                }
            )
        })
        .catch(err => { throw err })

}