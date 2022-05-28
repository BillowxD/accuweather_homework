import {reactive} from 'vue'

export const User = reactive({
    darkMode: localStorage.getItem("darkMode") !== null ? localStorage.getItem("darkMode") === 'true' : false,
    apiKey: '18e8a3bf81764aeba47212043222705',
    favourites: localStorage.getItem("favourites") !== null ? JSON.parse(localStorage.getItem("favourites")) : {},
    isFavourite(name) {
        if (this.favourites === null) return false;
        return typeof this.favourites[name] !== typeof undefined;
    },
    toggleFavourite(location) {
        if (this.isFavourite(location.name)) {
            delete this.favourites[location.name];
        } else {
            this.favourites[location.name] = location;
        }
        localStorage.setItem('favourites', JSON.stringify(this.favourites));
    },
    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        localStorage.setItem("darkMode", this.darkMode);
    },
    geoLocation() {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                resolve(pos)
            }, () => {
                resolve(false)
            });
        });
    },
    async getLocationPosition() {
        let position = await this.geoLocation();
        if (position === false) {
            try {
                let req = await fetch("http://ip-api.com/json/");
                if (req.status !== 200) throw 'fetch failed';
                let res = await req.json();
                return [res.lat, res.lon].join(',');
            } catch (e) {
                return 'Tel aviv'
            }
        } else {
            return [position.coords.latitude, position.coords.longitude].join(',');
        }
    }
});

