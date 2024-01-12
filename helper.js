export async function fetchTemplates() {
    var links;
    await fetch('http://127.0.0.1:5500/data.json')
        .then((response) => response.json())
        .then((json) => {
            links = json
        });
    return links;
}