export async function fetchTemplates() {
    var links;
    await fetch('https://tushargarg0987.github.io/get-react-template/data.json')
        .then((response) => response.json())
        .then((json) => {
            links = json
        });
    return links;
}