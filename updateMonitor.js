document.getElementById('updateButton').addEventListener('click', function() {
    var warningThreshold = document.getElementById('warningThreshold').value;
    var errorThreshold = document.getElementById('errorThreshold').value;

    fetch('C:/Users/shashwat.prakash/CAF/monitorConfig.json')
    .then(response => response.json())
    .then(data => {
        let scriptSource = data.triggers[0].query_level_trigger.condition.script.source;

        scriptSource = scriptSource.replace(/def WARNING_THRESHOLD = \d+;/, 'def WARNING_THRESHOLD = ${warningThreshold}' );
        scriptSource = scriptSource.replace(/def ERROR_THRESHOLD = \d+;/, 'def ERROR_THRESHOLD = ${errorThreshold});

        data.triggers[0].query_level_trigger.condition.script.source = scriptSource;

        return fetch('YOUR_OPENSEARCH_ENDPOINT', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Add other necessary headers
            },
            body: JSON.stringify(data)
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(updatedData => console.log(updatedData))
    .catch(error => console.error('Error:', error));
});