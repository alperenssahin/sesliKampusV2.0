let sd = {
    sort: 'nto',
    isFilter: false,
    activeFilters: [],
    filter: {
        year: {start: null, end: null},
        space: null,
        hour: {start: null, end: null},
        tag: null,
        location: {selected: null, step1: null, step2: null, step3: null,}
    },
    data: null,
    keyList: [],
    npIndex: null,
};

function msort(data) {
    let keys = [];
    if (sd.isFilter) {
        for (let key in data) {
            let d = data[key];
            let c = true;
            for (let ft of sd.activeFilters) {
                if (ft === 'year') {
                    let y = Number(d.date.split('.')[2]);
                    if (y >= sd.filter.year.start && y <= sd.filter.year.end) ;
                    else c = false;
                }
                if (ft === 'space') {
                    if (d.genre === sd.filter.space) ;
                    else c = false;
                }
                if (ft === 'tag') {
                    if (d.tag.includes(sd.filter.tag)) ;
                    else c = false;
                }
                if (ft === 'hour') {
                    let t = Number(d.time.replace(':', ''));
                    if (t > sd.filter.hour.start && t < sd.filter.hour.end) ;
                    else c = false;
                }
                if (ft === 'location') {
                    if (sd.filter.location[sd.filter.location.selected] === d.location[sd.filter.location.selected]) ;
                    else c = false;
                }
            }
            if (c) {
                keys.push(key);
            }
        }
    } else {
        for (let key in data) {
            keys.push(key)
        }

    }
    if (sd.sort === 'nto') {
        for (let i = 0; i < keys.length - 1; i++) {
            let a = i;
            for (let y = i + 1; y < keys.length; y++) {
                let ki = data[keys[a]].timestamp;
                let ty = data[keys[y]].timestamp;
                if (ki > ty) {
                    a = y;
                    let tmp = keys[a];
                    keys[a] = keys[i];
                    keys[i] = tmp;
                }
            }
        }
    }
    if (sd.sort === 'otn') {
        for (let i = 0; i < keys.length - 1; i++) {
            let a = i;
            for (let y = i + 1; y < keys.length; y++) {
                let ki = data[keys[a]].timestamp;
                let ty = data[keys[y]].timestamp;
                if (ki < ty) {
                    a = y;
                    let tmp = keys[a];
                    keys[a] = keys[i];
                    keys[i] = tmp;
                }
            }
        }
    }
    return keys;
}