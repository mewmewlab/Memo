// place files you want to import through the `$lib` alias in this folder.
import { browser } from "$app/environment"

let API_BASE_URL = ""
if (browser) {
    API_BASE_URL = document.location.origin;
    if (import.meta.env.MODE === 'development') {
        API_BASE_URL = import.meta.env.VITE_API_URL;
    }
}


export { API_BASE_URL}