const url = 'https://jsonplaceholder.typicode.com';

const getData = (type, handleSuccess) => {
    fetch(`${url}/${type}`, {
            method: 'GET',
        }
    ).then(response => response.json()
    ).then(success => handleSuccess(success)
    ).catch(
        error => console.log(error)
    );
};

const postData = (type, data, handleSuccess) => {
    fetch(`${url}/${type}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}}
    ).then(response => response.json()
    ).then(success => handleSuccess(success)
    ).catch(
        error => console.log(error)
    );
};

const editData = (type, data, handleSuccess) => {
    fetch(`${url}/${type}/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}}
    ).then(response => response.json()
    ).then(success => handleSuccess(success)
    ).catch(
        error => console.log(error)
    );
};


export {getData, postData, editData};