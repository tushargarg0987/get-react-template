export async function fetchLinks() {
    var links;
    await fetch('data_url')
        .then((response) => response.json())
        .then((json) => {
            links = json
        });
    return links;
}