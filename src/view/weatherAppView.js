import {tempFormat,timeFormat,getDay} from '../helper.js';

class WeatherAppView{
    _parentElement = document.querySelector('.content');
    _input = document.querySelector('.search');
    _data;

    render(data){
        if(!data) return 
        this._data = data;
        console.log(this._data.temp)
        this._clear();
        if(!this._data.hasData){
            const markup = this._generateMarkup();
            this._parentElement.insertAdjacentHTML('beforeend', markup)
        }
    }

    _clear(){
        const container = this._parentElement.querySelector('.container');
        if(container != null){
            container.remove();

        }
    }
    // update(data){
    //     this._data = data;
    //     const newMarkup = this._generateMarkup();
    //     const newDOM = document.createRange().createContextualFragment(newMarkup);
    //     const newElements = Array.from(newDOM.querySelectorAll('*'));
    //     const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    //     newElements.forEach((newEl, i)=>{
    //         const curEl = curElements[i];
    //         if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
    //             curEl.textContent = newEl.textContent
    //         }
    //         if(!newEl.isEqualNode(curEl)){
    //             Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
    //         }
    //     });
    // }

    addHandlerFind(handler){
        const input = this._parentElement.querySelector('.search');
        this._parentElement.querySelector('#myForm').addEventListener('submit', function(e){
            e.preventDefault();
            console.log(e.target)
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            const place = data.place.split(',').map(i =>i.trim());
            handler(place);
            input.value = '';
        });
    }

    addHandlerLive(handler){
        this._parentElement.querySelector('.btn__live').addEventListener('click', handler);
    }

    addHandlerRender(handler){
        window.addEventListener('load', handler);
    }

    icons(climate){
        if(climate == 'Clear'){
            return `
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 66.6667C43 66.6667 45.9033 66.18 48.71 65.2067C51.5144 64.2356 54.0833 62.8333 56.4167 61C53.1944 59.8333 49.7922 57.9578 46.21 55.3733C42.6255 52.7911 39.4722 49.5556 36.75 45.6667C34.0278 41.7778 32.0422 37.2633 30.7933 32.1233C29.5422 26.9856 29.5833 21.2778 30.9167 15C25.75 16.8333 21.5278 20.0133 18.25 24.54C14.9722 29.0689 13.3333 34.2222 13.3333 40C13.3333 47.3889 15.9311 53.6811 21.1267 58.8767C26.32 64.07 32.6111 66.6667 40 66.6667ZM40 73.3333C35.3889 73.3333 31.0555 72.4578 27 70.7067C22.9444 68.9578 19.4167 66.5833 16.4167 63.5833C13.4167 60.5833 11.0422 57.0556 9.29332 53C7.54221 48.9444 6.66666 44.6111 6.66666 40C6.66666 31.8333 9.23554 24.6389 14.3733 18.4167C19.5133 12.1944 26.3889 8.41667 35 7.08333C36.6111 6.80556 37.7644 7.18 38.46 8.20667C39.1533 9.23556 39.1944 10.5833 38.5833 12.25C36.9167 16.9167 36.3333 21.6244 36.8333 26.3733C37.3333 31.1244 38.6944 35.5 40.9167 39.5C43.1389 43.5 46.1255 46.9578 49.8767 49.8733C53.6255 52.7911 57.9167 54.7778 62.75 55.8333C64.5278 56.2222 65.6522 56.9722 66.1233 58.0833C66.5967 59.1944 66.3055 60.3611 65.25 61.5833C62.1944 65.1944 58.4867 68.0556 54.1267 70.1667C49.7644 72.2778 45.0555 73.3333 40 73.3333Z" fill="white"/>
            </svg>
            `;
        }
        if(climate == 'Clouds'){
            return `
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512">
                <path fill="none" stroke="white" stroke-linejoin="round" stroke-width="32" d="M90.61 306.85A16.07 16.07 0 0 0 104 293.6C116.09 220.17 169.63 176 232 176c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0 0 12.2 9.87c50 8.15 91.6 41.54 91.6 99.59c0 59.4-48.6 100.8-108 100.8H106c-49.5 0-90-24.7-90-79.2c0-48.47 38.67-72.22 74.61-77.95Z"/><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M384.8 271.4a80 80 0 1 0-123.55-92M464 208h32M336 48v32M222.86 94.86l22.63 22.63m203.65-22.63l-22.63 22.63"/>
            </svg>
            `;
        }
        if(climate == 'Rain'){
            return `
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_7_2)">
            <path d="M20.79 60.125C21.1017 60.2289 21.3898 60.3932 21.6379 60.6086C21.886 60.8239 22.0893 61.0861 22.236 61.38C22.3827 61.674 22.4701 61.9939 22.4931 62.3217C22.5161 62.6494 22.4743 62.9784 22.37 63.29L19.87 70.79C19.6424 71.3952 19.1891 71.8887 18.6054 72.1669C18.0217 72.445 17.3529 72.4862 16.7394 72.2817C16.126 72.0772 15.6157 71.643 15.3156 71.0703C15.0155 70.4975 14.949 69.8308 15.13 69.21L17.63 61.71C17.8389 61.0808 18.2892 60.5604 18.8818 60.2631C19.4744 59.9659 20.1608 59.9162 20.79 60.125ZM35.79 60.125C36.1017 60.2289 36.3898 60.3932 36.6379 60.6086C36.886 60.8239 37.0893 61.0861 37.236 61.38C37.3827 61.674 37.4701 61.9939 37.4931 62.3217C37.5161 62.6494 37.4743 62.9784 37.37 63.29L32.37 78.29C32.1424 78.8952 31.6891 79.3887 31.1054 79.6669C30.5217 79.945 29.8529 79.9862 29.2394 79.7817C28.626 79.5772 28.1157 79.143 27.8156 78.5703C27.5155 77.9975 27.449 77.3308 27.63 76.71L32.63 61.71C32.8389 61.0808 33.2892 60.5604 33.8818 60.2631C34.4744 59.9659 35.1608 59.9162 35.79 60.125V60.125ZM50.79 60.125C51.1017 60.2289 51.3898 60.3932 51.6379 60.6086C51.886 60.8239 52.0893 61.0861 52.236 61.38C52.3827 61.674 52.4701 61.9939 52.4931 62.3217C52.5161 62.6494 52.4743 62.9784 52.37 63.29L49.87 70.79C49.6424 71.3952 49.1891 71.8887 48.6054 72.1669C48.0217 72.445 47.3529 72.4862 46.7394 72.2817C46.126 72.0772 45.6157 71.643 45.3156 71.0703C45.0155 70.4975 44.949 69.8308 45.13 69.21L47.63 61.71C47.8389 61.0808 48.2892 60.5604 48.8818 60.2631C49.4744 59.9659 50.1608 59.9162 50.79 60.125ZM65.79 60.125C66.1017 60.2289 66.3898 60.3932 66.6379 60.6086C66.886 60.8239 67.0893 61.0861 67.236 61.38C67.3827 61.674 67.4701 61.9939 67.4931 62.3217C67.5161 62.6494 67.4743 62.9784 67.37 63.29L62.37 78.29C62.2758 78.6128 62.1175 78.9134 61.9045 79.1736C61.6915 79.4338 61.4282 79.6484 61.1303 79.8045C60.8324 79.9605 60.5061 80.0549 60.1709 80.0819C59.8357 80.1089 59.4985 80.0681 59.1794 79.9617C58.8604 79.8554 58.5661 79.6857 58.3142 79.463C58.0622 79.2403 57.8578 78.969 57.7131 78.6654C57.5685 78.3618 57.4865 78.0322 57.4723 77.6962C57.458 77.3602 57.5116 77.0248 57.63 76.71L62.63 61.71C62.8389 61.0808 63.2892 60.5604 63.8818 60.2631C64.4744 59.9659 65.1608 59.9162 65.79 60.125ZM67.025 25.135C65.9867 19.9008 63.3011 15.1361 59.361 11.5374C55.4209 7.93874 50.4329 5.69493 45.1262 5.13404C39.8196 4.57316 34.4727 5.72461 29.8673 8.42005C25.2619 11.1155 21.6396 15.2135 19.53 20.115C17.1642 19.8425 14.7677 20.0557 12.4871 20.7415C10.2066 21.4274 8.08999 22.5715 6.26699 24.1039C4.444 25.6362 2.95295 27.5245 1.88512 29.6531C0.817287 31.7818 0.195154 34.106 0.0568077 36.4834C-0.0815382 38.8608 0.266814 41.2415 1.08054 43.4796C1.89426 45.7177 3.15623 47.7662 4.78918 49.4997C6.42214 51.2331 8.39171 52.615 10.5773 53.5608C12.7629 54.5066 15.1186 54.9963 17.5 55H65C68.8056 55.0044 72.4705 53.5621 75.2524 50.9654C78.0344 48.3686 79.7253 44.8116 79.9828 41.0148C80.2402 37.2179 79.0449 33.4652 76.639 30.5167C74.233 27.5682 70.7963 25.6444 67.025 25.135V25.135ZM42.5 10C47.4198 9.99898 52.1673 11.8113 55.8349 15.0906C59.5025 18.3698 61.8327 22.8858 62.38 27.775C62.448 28.3893 62.7411 28.9566 63.2028 29.3675C63.6645 29.7784 64.262 30.0038 64.88 30H65C67.6522 30 70.1957 31.0536 72.0711 32.9289C73.9464 34.8043 75 37.3478 75 40C75 42.6522 73.9464 45.1957 72.0711 47.0711C70.1957 48.9464 67.6522 50 65 50H17.5C15.7304 49.9991 13.9811 49.6225 12.3679 48.8951C10.7547 48.1676 9.31433 47.106 8.14209 45.7803C6.96984 44.4546 6.09244 42.8951 5.56793 41.205C5.04341 39.5149 4.88373 37.7327 5.09945 35.9762C5.31517 34.2198 5.90138 32.5292 6.81929 31.0162C7.7372 29.5033 8.96589 28.2025 10.4241 27.1998C11.8823 26.1972 13.5368 25.5156 15.278 25.2002C17.0193 24.8848 18.8078 24.9426 20.525 25.37C21.1377 25.5228 21.7854 25.4381 22.3382 25.133C22.891 24.8278 23.3078 24.3248 23.505 23.725C24.8264 19.7309 27.3731 16.2548 30.7831 13.7909C34.1931 11.327 38.293 10.0005 42.5 10V10Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_7_2">
            <rect width="80" height="80" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            `;
        }
        if(climate == 'Snow'){
            return `
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_8_4)">
            <path d="M67.025 21.385C65.9867 16.1508 63.3011 11.386 59.361 7.78739C55.4209 4.18873 50.4329 1.94492 45.1262 1.38404C39.8196 0.823152 34.4727 1.97461 29.8673 4.67004C25.2619 7.36548 21.6396 11.4635 19.53 16.365C17.1642 16.0925 14.7677 16.3056 12.4871 16.9915C10.2066 17.6774 8.08999 18.8215 6.26699 20.3539C4.444 21.8862 2.95295 23.7745 1.88512 25.9031C0.817287 28.0318 0.195154 30.356 0.0568077 32.7334C-0.0815382 35.1108 0.266814 37.4915 1.08054 39.7296C1.89426 41.9677 3.15623 44.0162 4.78918 45.7497C6.42214 47.4831 8.39171 48.865 10.5773 49.8108C12.7629 50.7566 15.1186 51.2463 17.5 51.25H65C68.8056 51.2543 72.4705 49.8121 75.2524 47.2154C78.0344 44.6186 79.7253 41.0616 79.9828 37.2648C80.2402 33.4679 79.0449 29.7152 76.639 26.7667C74.233 23.8182 70.7963 21.8944 67.025 21.385V21.385ZM42.5 6.25C47.4198 6.24897 52.1673 8.06134 55.8349 11.3406C59.5025 14.6198 61.8327 19.1358 62.38 24.025C62.448 24.6393 62.7411 25.2066 63.2028 25.6175C63.6645 26.0284 64.262 26.2537 64.88 26.25H65C67.6522 26.2507 70.1955 27.3049 72.0703 29.1807C73.9452 31.0565 74.9982 33.6003 74.9975 36.2525C74.9968 38.9047 73.9426 41.4479 72.0668 43.3228C70.191 45.1977 67.6472 46.2507 64.995 46.25H17.5C15.7304 46.2491 13.9811 45.8725 12.3679 45.1451C10.7547 44.4176 9.31433 43.356 8.14209 42.0303C6.96984 40.7046 6.09244 39.1451 5.56793 37.455C5.04341 35.7649 4.88373 33.9827 5.09945 32.2262C5.31517 30.4698 5.90138 28.7792 6.81929 27.2662C7.7372 25.7533 8.96589 24.4525 10.4241 23.4498C11.8823 22.4472 13.5368 21.7656 15.278 21.4502C17.0193 21.1347 18.8078 21.1926 20.525 21.62C21.1377 21.7728 21.7854 21.6881 22.3382 21.383C22.891 21.0778 23.3078 20.5748 23.505 19.975C24.8264 15.9809 27.3731 12.5048 30.7831 10.0409C34.1931 7.57696 38.293 6.25049 42.5 6.25V6.25ZM13.125 57.5C13.4565 57.5 13.7745 57.6317 14.0089 57.8661C14.2433 58.1005 14.375 58.4185 14.375 58.75V61.6L16.88 60.165C17.1672 60.0098 17.5036 59.9731 17.8175 60.0627C18.1313 60.1523 18.3977 60.3611 18.5596 60.6445C18.7216 60.9279 18.7662 61.2634 18.6841 61.5793C18.6019 61.8952 18.3995 62.1664 18.12 62.335L15.645 63.75L18.12 65.165C18.3995 65.3336 18.6019 65.6048 18.6841 65.9207C18.7662 66.2366 18.7216 66.5721 18.5596 66.8555C18.3977 67.1389 18.1313 67.3477 17.8175 67.4373C17.5036 67.5269 17.1672 67.4902 16.88 67.335L14.375 65.905V68.75C14.375 69.0815 14.2433 69.3995 14.0089 69.6339C13.7745 69.8683 13.4565 70 13.125 70C12.7935 70 12.4755 69.8683 12.2411 69.6339C12.0067 69.3995 11.875 69.0815 11.875 68.75V65.9L9.37001 67.335C9.08287 67.4902 8.74641 67.5269 8.43255 67.4373C8.11869 67.3477 7.85233 67.1389 7.69039 66.8555C7.52845 66.5721 7.48378 66.2366 7.56593 65.9207C7.64808 65.6048 7.85053 65.3336 8.13001 65.165L10.605 63.75L8.13001 62.335C7.85053 62.1664 7.64808 61.8952 7.56593 61.5793C7.48378 61.2634 7.52845 60.9279 7.69039 60.6445C7.85233 60.3611 8.11869 60.1523 8.43255 60.0627C8.74641 59.9731 9.08287 60.0098 9.37001 60.165L11.875 61.595V58.75C11.875 58.4185 12.0067 58.1005 12.2411 57.8661C12.4755 57.6317 12.7935 57.5 13.125 57.5V57.5ZM26.875 67.5C27.2065 67.5 27.5245 67.6317 27.7589 67.8661C27.9933 68.1005 28.125 68.4185 28.125 68.75V71.6L30.63 70.165C30.9172 70.0098 31.2536 69.9731 31.5675 70.0627C31.8813 70.1523 32.1477 70.3611 32.3096 70.6445C32.4716 70.9279 32.5162 71.2634 32.4341 71.5793C32.3519 71.8952 32.1495 72.1664 31.87 72.335L29.395 73.75L31.87 75.165C32.1495 75.3336 32.3519 75.6048 32.4341 75.9207C32.5162 76.2366 32.4716 76.5721 32.3096 76.8555C32.1477 77.1389 31.8813 77.3477 31.5675 77.4373C31.2536 77.5269 30.9172 77.4902 30.63 77.335L28.125 75.905V78.75C28.125 79.0815 27.9933 79.3995 27.7589 79.6339C27.5245 79.8683 27.2065 80 26.875 80C26.5435 80 26.2255 79.8683 25.9911 79.6339C25.7567 79.3995 25.625 79.0815 25.625 78.75V75.9L23.12 77.335C22.8329 77.4902 22.4964 77.5269 22.1825 77.4373C21.8687 77.3477 21.6023 77.1389 21.4404 76.8555C21.2785 76.5721 21.2338 76.2366 21.3159 75.9207C21.3981 75.6048 21.6005 75.3336 21.88 75.165L24.355 73.75L21.88 72.335C21.6005 72.1664 21.3981 71.8952 21.3159 71.5793C21.2338 71.2634 21.2785 70.9279 21.4404 70.6445C21.6023 70.3611 21.8687 70.1523 22.1825 70.0627C22.4964 69.9731 22.8329 70.0098 23.12 70.165L25.625 71.595V68.75C25.625 68.4185 25.7567 68.1005 25.9911 67.8661C26.2255 67.6317 26.5435 67.5 26.875 67.5ZM54.375 67.5C54.7065 67.5 55.0245 67.6317 55.2589 67.8661C55.4933 68.1005 55.625 68.4185 55.625 68.75V71.6L58.13 70.165C58.4172 70.0098 58.7536 69.9731 59.0675 70.0627C59.3813 70.1523 59.6477 70.3611 59.8096 70.6445C59.9716 70.9279 60.0162 71.2634 59.9341 71.5793C59.8519 71.8952 59.6495 72.1664 59.37 72.335L56.895 73.75L59.37 75.165C59.6495 75.3336 59.8519 75.6048 59.9341 75.9207C60.0162 76.2366 59.9716 76.5721 59.8096 76.8555C59.6477 77.1389 59.3813 77.3477 59.0675 77.4373C58.7536 77.5269 58.4172 77.4902 58.13 77.335L55.625 75.905V78.75C55.625 79.0815 55.4933 79.3995 55.2589 79.6339C55.0245 79.8683 54.7065 80 54.375 80C54.0435 80 53.7255 79.8683 53.4911 79.6339C53.2567 79.3995 53.125 79.0815 53.125 78.75V75.9L50.62 77.335C50.3329 77.4902 49.9964 77.5269 49.6826 77.4373C49.3687 77.3477 49.1023 77.1389 48.9404 76.8555C48.7784 76.5721 48.7338 76.2366 48.8159 75.9207C48.8981 75.6048 49.1005 75.3336 49.38 75.165L51.855 73.75L49.38 72.335C49.1005 72.1664 48.8981 71.8952 48.8159 71.5793C48.7338 71.2634 48.7784 70.9279 48.9404 70.6445C49.1023 70.3611 49.3687 70.1523 49.6826 70.0627C49.9964 69.9731 50.3329 70.0098 50.62 70.165L53.125 71.595V68.75C53.125 68.4185 53.2567 68.1005 53.4911 67.8661C53.7255 67.6317 54.0435 67.5 54.375 67.5ZM40.625 57.5C40.9565 57.5 41.2745 57.6317 41.5089 57.8661C41.7433 58.1005 41.875 58.4185 41.875 58.75V61.6L44.38 60.165C44.6672 60.0098 45.0036 59.9731 45.3175 60.0627C45.6313 60.1523 45.8977 60.3611 46.0596 60.6445C46.2216 60.9279 46.2662 61.2634 46.1841 61.5793C46.1019 61.8952 45.8995 62.1664 45.62 62.335L43.145 63.75L45.62 65.165C45.8995 65.3336 46.1019 65.6048 46.1841 65.9207C46.2662 66.2366 46.2216 66.5721 46.0596 66.8555C45.8977 67.1389 45.6313 67.3477 45.3175 67.4373C45.0036 67.5269 44.6672 67.4902 44.38 67.335L41.875 65.905V68.75C41.875 69.0815 41.7433 69.3995 41.5089 69.6339C41.2745 69.8683 40.9565 70 40.625 70C40.2935 70 39.9755 69.8683 39.7411 69.6339C39.5067 69.3995 39.375 69.0815 39.375 68.75V65.9L36.87 67.335C36.5829 67.4902 36.2464 67.5269 35.9325 67.4373C35.6187 67.3477 35.3523 67.1389 35.1904 66.8555C35.0285 66.5721 34.9838 66.2366 35.0659 65.9207C35.1481 65.6048 35.3505 65.3336 35.63 65.165L38.105 63.75L35.63 62.335C35.3505 62.1664 35.1481 61.8952 35.0659 61.5793C34.9838 61.2634 35.0285 60.9279 35.1904 60.6445C35.3523 60.3611 35.6187 60.1523 35.9325 60.0627C36.2464 59.9731 36.5829 60.0098 36.87 60.165L39.375 61.595V58.75C39.375 58.4185 39.5067 58.1005 39.7411 57.8661C39.9755 57.6317 40.2935 57.5 40.625 57.5ZM68.125 57.5C68.4565 57.5 68.7745 57.6317 69.0089 57.8661C69.2433 58.1005 69.375 58.4185 69.375 58.75V61.6L71.88 60.165C72.1672 60.0098 72.5036 59.9731 72.8175 60.0627C73.1313 60.1523 73.3977 60.3611 73.5596 60.6445C73.7216 60.9279 73.7662 61.2634 73.6841 61.5793C73.6019 61.8952 73.3995 62.1664 73.12 62.335L70.645 63.75L73.12 65.165C73.3995 65.3336 73.6019 65.6048 73.6841 65.9207C73.7662 66.2366 73.7216 66.5721 73.5596 66.8555C73.3977 67.1389 73.1313 67.3477 72.8175 67.4373C72.5036 67.5269 72.1672 67.4902 71.88 67.335L69.375 65.905V68.75C69.375 69.0815 69.2433 69.3995 69.0089 69.6339C68.7745 69.8683 68.4565 70 68.125 70C67.7935 70 67.4755 69.8683 67.2411 69.6339C67.0067 69.3995 66.875 69.0815 66.875 68.75V65.9L64.37 67.335C64.0829 67.4902 63.7464 67.5269 63.4326 67.4373C63.1187 67.3477 62.8523 67.1389 62.6904 66.8555C62.5284 66.5721 62.4838 66.2366 62.5659 65.9207C62.6481 65.6048 62.8505 65.3336 63.13 65.165L65.605 63.75L63.13 62.335C62.8505 62.1664 62.6481 61.8952 62.5659 61.5793C62.4838 61.2634 62.5284 60.9279 62.6904 60.6445C62.8523 60.3611 63.1187 60.1523 63.4326 60.0627C63.7464 59.9731 64.0829 60.0098 64.37 60.165L66.875 61.595V58.75C66.875 58.4185 67.0067 58.1005 67.2411 57.8661C67.4755 57.6317 67.7935 57.5 68.125 57.5Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_8_4">
            <rect width="80" height="80" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            `;
        }
        if(climate == 'Mist'){
            console.log('Mist')
            return `
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.4117 63.3333H54.5883C55.1307 63.3184 55.6575 63.5163 56.056 63.8845C56.4545 64.2528 56.6931 64.7623 56.721 65.3042C56.7488 65.8461 56.5637 66.3774 56.205 66.7846C55.8464 67.1918 55.3427 67.4425 54.8017 67.4833L54.5883 67.4933H25.4117C24.8693 67.5082 24.3425 67.3104 23.944 66.9422C23.5455 66.5739 23.3069 66.0644 23.279 65.5225C23.2512 64.9806 23.4363 64.4493 23.795 64.0421C24.1536 63.6349 24.6573 63.3841 25.1983 63.3433L25.4117 63.3333ZM15.4117 55H64.5867C65.1215 54.9975 65.6368 55.2011 66.0255 55.5685C66.4141 55.936 66.6463 56.439 66.6738 56.9732C66.7012 57.5074 66.5219 58.0316 66.1729 58.4369C65.824 58.8423 65.3323 59.0977 64.8 59.15L64.5867 59.16H15.4133C14.8785 59.1625 14.3632 58.9589 13.9745 58.5915C13.5859 58.224 13.3537 57.721 13.3262 57.1868C13.2988 56.6526 13.4781 56.1284 13.8271 55.7231C14.176 55.3177 14.6677 55.0623 15.2 55.01L15.4133 55H15.4117ZM40 11.6667C50.5617 11.6667 56.5533 18.6583 57.425 27.1H57.6917C64.4883 27.1 69.9983 32.5967 69.9983 39.375C69.9983 46.155 64.4883 51.65 57.6917 51.65H22.3083C15.51 51.65 10 46.155 10 39.375C10 32.5967 15.51 27.1 22.3067 27.1H22.5733C23.45 18.6017 29.4367 11.6667 40 11.6667ZM40 15.825C32.8983 15.825 26.7083 21.5717 26.7083 29.5083C26.7083 30.7667 25.615 31.755 24.3617 31.755H21.995C17.6717 31.755 14.1667 35.2767 14.1667 39.6217C14.1667 43.9683 17.6717 47.4917 21.995 47.4917H58.005C62.3283 47.4917 65.8333 43.9683 65.8333 39.6233C65.8333 35.2767 62.3283 31.7533 58.005 31.7533H55.6383C54.385 31.7533 53.2917 30.7667 53.2917 29.51C53.2917 21.47 47.1017 15.8267 40 15.8267V15.825Z" fill="white"/>
            </svg>
            `
        }
      
    }

    _generateMarkup(){
        return `
        <div class="container">
        <div>
            <header>
                <h1 class="place">${this._data.city}, ${this._data.countryCode}</h1>
                <p class="date">${getDay()}</p>
            </header>
        </div>
        <div class="contend">
            <div class="weather__temp">
                ${this.icons(this._data.curClimate)}
                <!-- <svg class="icon" width="128" height="88" viewBox="0 0 128 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M85 87.75H26.5C19.125 87.75 12.77 86.2207 8.1175 83.3281C2.8075 80.0234 0 75.123 0 69.1562C0 63.9492 2.52 59.4297 7.285 56.0879C11.095 53.416 16.3275 51.5547 22.035 50.8457C22.05 50.8457 22.055 50.8457 22.0575 50.8359C23.6675 43.2188 28.015 36.7559 34.635 32.1484C41.0752 27.686 49.3918 25.2306 58 25.25C65.5575 25.25 72.62 27.084 78.4275 30.5566C83.5046 33.6356 87.4227 37.7291 89.7675 42.4043C97.12 43.3457 103.448 45.7461 108.065 49.3457C113.25 53.3965 116 58.7871 116 64.9375C116 71.3535 112.718 77.2168 106.75 81.4453C101.028 85.5117 93.3 87.75 85 87.75ZM95.375 36.9473C99.373 37.7448 103.2 38.995 106.735 40.6582C108.365 36.9154 108.438 32.8659 106.945 29.0884C105.452 25.311 102.469 21.9988 98.4223 19.6253C94.3754 17.2518 89.4717 15.9384 84.4121 15.8727C79.3524 15.8071 74.3956 16.9926 70.25 19.2598C69.775 19.5202 69.3133 19.7936 68.865 20.0801C74.0977 21.1489 79.0045 23.0235 83.2975 25.5937C88.3365 28.6436 92.459 32.519 95.375 36.9473V36.9473ZM112 31.5H128V37.75H112V31.5ZM80 0.25H88V12.75H80V0.25ZM63.8375 19.3184L66.95 16.8867L55.795 8.16992L50.1375 12.5898L58.43 19.0684H58.58C60.3374 19.0677 62.0932 19.1512 63.8375 19.3184V19.3184ZM101.051 16.8848L112.207 8.16894L117.864 12.5883L106.708 21.3043L101.051 16.8848Z" fill="white"/>
                </svg> 
                -->
                <div class="temp__temp">
                    <p class="temp-temp main">${tempFormat(this._data.temp)}°</p>
                    <p class="temp-climate sub">Feels like ${tempFormat(this._data.feelsLike)}°C</p>
                </div>
            </div> 
    
            <div class="weather__others">
                <svg class="seperator" width="2" height="188" viewBox="0 0 2 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.75 0H0.25V188H1.75V0Z" fill="white"/>
                </svg>
                <ul class="others_1">
                    <li class="main first">${tempFormat(this._data.tempMax)}°</li>
                    <li class="sub">High</li>
                    <li class="main second">${tempFormat(this._data.tempMin)}°</li>
                    <li class="sub">low</li>
                </ul>
                <ul class="others_2">
                    <li class="main first">${(this._data.windSpeed*3.6).toFixed()} km/h</li>
                    <li class="sub">Wind</li>
                    <li class="main second">${this._data.humidity}%</li>
                    <li class="sub">Humidity</li>
                </ul>
                <ul class="others_3">
                    <li class="main first">${timeFormat(this._data.sunrise)}</li>
                    <li class="sub">Sunrise</li>
                    <li class="main second">${timeFormat(this._data.sunset)}</li>
                    <li class="sub">Sunset</li>
                </ul>
                </div>
            </div>`
    }
}

export default new WeatherAppView()