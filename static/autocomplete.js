const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "District Of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
    "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
    "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
];

const update = (list_ele, list_data) => {
    list_ele.empty();
    if (list_data.length > 0) {
        const input_ele = list_ele.parent().children('input');
        for (let item_data of list_data) {
            let item_ele = $(`<div class="item">${item_data}</div>`);
            item_ele.mousedown(() => { input_ele.val(item_data); list_ele.hide(); });
            list_ele.append(item_ele);
        }
        list_ele.show();
    } else {
        list_ele.hide();
    }
};

const load_local = (local_input_selector) => {
    const local_input_ele = $(local_input_selector);
    local_input_ele.on('keyup', () => {
        let val = local_input_ele.val(), list_data = [];

        if (val.length > 0) {
            states.forEach((state) => {
                if (state.toLowerCase().startsWith(val.toLowerCase()))
                    list_data.push(state);
            });
        }

        let list_ele = local_input_ele.parent().children('.list');
        update(list_ele, list_data);
    }).blur(() => {
        $(local_input_selector).parent().children('.list').hide();
    });
}

const load_remote = (remote_input_selector) => {
    const remote_input_ele = $(remote_input_selector);
    let timestamp = 0;

    remote_input_ele.on('keyup', () => {
        timestamp += 1;
        let val = remote_input_ele.val(), list_data = [], c_time = timestamp;

        $.get(`/getstates?k=${val}`, (data) => {
            if (c_time == timestamp) {
                let list_ele = remote_input_ele.parent().children('.list'), list_data = data;
                update(list_ele, list_data);
            } else {
                list_ele.hide();
            }
        });
    }).blur(function (){
        remote_input_ele.parent().children('.list').hide();
    });
}
