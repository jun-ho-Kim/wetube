const currentUrl = () => {
const currentUrl = window.location.href;
fetch(currentUrl, {
    method: "POST"
});
}