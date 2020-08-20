import {decorate, observable} from "mobx"

class Store {
    break = 5;
    session = 25;
    timeLeftSeconds = 0;
    isSession = true;
    isStarted = false;
    isPaused = true;
}

decorate(Store, {
    break: observable,
    session: observable,
    timeLeftSeconds: observable,
    isSession: observable,
    isStarted: observable,
    isPaused: observable,
});

export const store = new Store();