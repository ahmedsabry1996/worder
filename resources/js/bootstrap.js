window._ = require('lodash');
window.Popper = require('popper.js');

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

else if (localStorage.getItem('access_token')) {
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
}

 else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// function parseJwt (token) {
//             var base64Url = token.split('.')[1];
//             var base64 = base64Url.replace('-', '+').replace('_', '/');
//             return JSON.parse(window.atob(base64));
// };
// if(localStorage.getItem("access_token")) {
//
//
//    let decoded = parseJwt(localStorage.getItem("access_token"));
//
//    alert(decoded.sub);
//
//    window.Echo.private(`App.User.`+decoded.sub)
//     .notification((notification) => {
//        console.log(notification);
//        alert('hi')
//    });
// }

//console.log(parseJwt(localStorage.getItem("access_token")));
