import { getPasswords } from "./accounts-list.js"
import { favItemsNumber } from "./sidebar.js"
import { getServiceIcon } from "./service-icon.js"
import { renderFavAccountDetails, deatilsContainer, deatilsSection } from "./account-deatils.js"

export const favoriteList = document.querySelector(".favorite-list")
export const openFavSidebar = document.querySelector(".open-fav-sidebar")
const favContainer = document.querySelector(".fav-container")

let favoritePasswords = []
export function saveFavoriteToLocalStorage(itemId) {

    favoritePasswords = JSON.parse(localStorage.getItem('favoritePasswords')) || []

    let passwords = getPasswords() || []

    const account = passwords.find(item => item.id == itemId)
    if (!account) return

    const isExist = favoritePasswords.findIndex(item => item.id == itemId)
    if (isExist !== -1) {
        favoritePasswords.splice(isExist,1)
        Toastify({
        text: "Password removed from favList",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
        }).showToast();
    } else {
        favoritePasswords.push(account)
        Toastify({
        text: "Password added to favList",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
        }).showToast();
    }

    localStorage.setItem("favoritePasswords", JSON.stringify(favoritePasswords))
    renderFavPasswords()
}

export function renderFavPasswords() {
    const favPasswords = JSON.parse(localStorage.getItem("favoritePasswords")) || []
    if (favPasswords.length === 0) {
        favContainer.innerHTML = `
            <div class="empty-state text-gray-400 text-center mt-[50%]">
                <h2 class="text-2xl font-[600] mb-3">No Vaults Yet</h2>
            </div>
        `
        favItemsNumber.textContent = favPasswords.length
        return
    }   

    favContainer.innerHTML = favPasswords.map(password => `
        <div data-id="${password.id}" class="vault-item flex items-center justify-between cursor-pointer p-3">
            <div class="flex gap-4">
                <div class="vault-icon bg-[#2a2a2a] px-3 py-3 rounded flex items-center justify-center text-white">
                    ${getServiceIcon(password.service)}
                </div>
                <div class="vault-content">
                    <div class="vault-title font-semibold">${password.service}</div>
                    <div class="vault-email text-[#D9D5D5] break-all">${password.userName}</div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-id="${password.id}" fill="currentColor" class="remove-item icon icon-tabler icons-tabler-filled icon-tabler-star text-[#F5C518]"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>  
        </div>
        
        `).join("")
        favItemsNumber.textContent = favPasswords.length
}

favContainer.addEventListener("click" , (e) => {
    const item = e.target.closest(".vault-item")
    if (!item) return
    localStorage.setItem("selectedVault", item.dataset.id)
    document.querySelectorAll(".vault-item").forEach(item => {item.classList.remove("vault-active")})
    item.classList.add("vault-active")
    renderFavAccountDetails()
})

function deleteFavItem(id) {
    let favoritePasswords = JSON.parse(localStorage.getItem("favoritePasswords")) || []
    favoritePasswords = favoritePasswords.filter(item => item.id != id)
    localStorage.setItem("favoritePasswords", JSON.stringify(favoritePasswords))
    renderFavPasswords()
    localStorage.removeItem("selectedVault")
    renderFavAccountDetails()
    Toastify({
    text: "Password removed from favlist",
    duration: 2000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
    }).showToast();
}

favContainer.addEventListener("click",(e) => {
    const removeItemBtn = e.target.closest(".remove-item")
    if(!removeItemBtn) return
    const id = removeItemBtn.dataset.id
    deleteFavItem(id)
})

export const isMobile = window.matchMedia("(max-width: 767px)");
favContainer.addEventListener("click", (e) => {

    const removeItemBtn = e.target.closest(".remove-item")
    if(removeItemBtn) return

    const vaultItem = e.target.closest(".vault-item");
    if (!vaultItem) return;

    localStorage.setItem("selectedVault", vaultItem.dataset.id);

    if (isMobile.matches) {
        favoriteList.classList.add("hidden");
        deatilsSection.classList.remove("hidden");
    }
});

deatilsContainer.addEventListener("click", (e) => {
    const backBtn = e.target.closest(".back-fav-btn");
    if (!backBtn) return;
    deatilsSection.classList.add("hidden");
    favoriteList.classList.remove("hidden");
});

// load page
document.addEventListener("DOMContentLoaded", () => {
    renderFavPasswords()
});