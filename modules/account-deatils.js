import { getPasswords} from "./accounts-list.js";
import { saveFavoriteToLocalStorage } from "./favorite-list.js";
import { getServiceIcon } from "./service-icon.js"


export const deatilsContainer = document.querySelector(".vault-container")
export const deatilsSection = document.querySelector(".deatils")

// renderAccountDeatils()
localStorage.removeItem("selectedVault")

export function renderAccountDeatils() {
    
    let passwordDeatils = getPasswords()
    deatilsContainer.innerHTML = ""
    let seclectedVault = localStorage.getItem("selectedVault")

    if (passwordDeatils.length === 0) {
        deatilsContainer.innerHTML = `
            <p class="text-center text-2xl text-gray-400 mt-[40%]">
                Select a vault to see details
            </p>
        `
        return
    }

    if (!seclectedVault) {

        deatilsContainer.innerHTML = `
            <p class="text-center text-2xl text-gray-400 mt-[40%]">
                Select a vault to see details
            </p>
        `
        return
    }

    const account = passwordDeatils.find(item => item.id == seclectedVault)

    const favPasswords = JSON.parse(localStorage.getItem("favoritePasswords")) || []
    const isFav = favPasswords.some(item => item.id == account.id)

    deatilsContainer.innerHTML = `
            <button class="back-btn md:hidden bg-[#2a2a2a] px-3 py-1 rounded mb-5 text-sm font-semibold">Back</button>
            <div class="valut-info flex justify-between items-center">
            <div class="valut-header flex gap-5">
                    <div class="vault-icon bg-[#2a2a2a] px-4 py-4 rounded flex justify-center text-white">
                        ${getServiceIcon(account.service)}
                    </div>
                    <h2 class="text-xl md:text-3xl font-semibold">${account.service}</h2>
                </div>
                <div class="valut-fav-icon cursor-pointer ${isFav ? 'text-[#F5C518]' : 'text-[#9CA3AF]'}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="fav-icon icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                </div>
            </div>
            <div class="vault-deatils py-8 border-y border-[#2a2a2a] mt-5">
                <form class="vault-inputs flex flex-col gap-8 cursor-pointer" action="">
                    <div class="user-name-input flex flex-col gap-1">
                        <h3 class="text-sm text-[#888]">Username</h3>
                        <div class="email">${account.userName}</div>
                    </div>
                    <div class="password-input flex items-center justify-between gap-1">
                        <div class="password-info">
                            <h3 class="text-sm text-[#888]">Password</h3>
                            <input type="password" class="cursor-pointer focus:outline-none bg-[#1a1a1a] text-white" readonly value="${account.password}">
                        </div>
                        <div class="password-icons cursor-pointer flex gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="show-password icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-password icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                        </div>
                    </div>
                    <div class="user-name-input flex flex-col gap-1">
                        <h3 class="text-sm text-[#888]">Website</h3>
                        <a href="${account.websiteURL}" target="_blank" class="email">${account.websiteURL}</a>
                    </div>
                </form>
            </div>
    
    `
}  

export function renderFavAccountDetails() {
    const favPasswords = JSON.parse(localStorage.getItem("favoritePasswords")) || []
    let seclectedVault = localStorage.getItem("selectedVault") 
    if (!seclectedVault || favPasswords.length === 0) {
        deatilsContainer.innerHTML = `
            <p class="text-center text-2xl text-gray-400 mt-[40%]">
                Select a favorite vault to see details
            </p>
        `
        return
    }
    const account = favPasswords.find(item => item.id == seclectedVault)
    if (!account) return

    deatilsContainer.innerHTML = `
            <button class="back-fav-btn md:hidden bg-[#2a2a2a] px-3 py-1 rounded mb-5 text-sm font-semibold">Back</button>
            <div class="valut-info flex justify-between items-center">
                <div class="valut-header flex gap-5">
                    <div class="vault-icon bg-[#2a2a2a] px-4 py-4 rounded flex justify-center text-white">
                        ${getServiceIcon(account.service)}
                    </div>
                    <h2 class="text-xl md:text-3xl font-semibold">${account.service}</h2>
                </div>
            </div>
            <div class="vault-deatils py-8 border-y border-[#2a2a2a] mt-5">
                <form class="vault-inputs flex flex-col gap-8 cursor-pointer" action="">
                    <div class="user-name-input flex flex-col gap-1">
                        <h3 class="text-sm text-[#888]">Username</h3>
                        <div class="email">${account.userName}</div>
                    </div>
                    <div class="password-input flex items-center justify-between gap-1">
                        <div class="password-info">
                            <h3 class="text-sm text-[#888]">Password</h3>
                            <input type="password" class="cursor-pointer focus:outline-none bg-[#1a1a1a] text-white" readonly value="${account.password}">
                        </div>
                        <div class="password-icons cursor-pointer flex gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="show-password icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-password icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                        </div>
                    </div>
                    <div class="user-name-input flex flex-col gap-1">
                        <h3 class="text-sm text-[#888]">Website</h3>
                        <a href="${account.websiteURL}" target="_blank" class="email">${account.websiteURL}</a>
                    </div>
                </form>
            </div>
    `

}


// show password 
deatilsContainer.addEventListener("click" , (e) => {

    const showPasswordBtn = e.target.closest(".show-password")
    if (!showPasswordBtn) return 
    const passwordWrapper = showPasswordBtn.closest(".password-input")
    const passwordInput = passwordWrapper.querySelector("input")

    if (passwordInput.type === "password") {
        passwordInput.type = "text"
    }
    else {
        passwordInput.type = "password"
    }
})
// copy password
deatilsContainer.addEventListener("click", async (e) => {
    const copyBtn = e.target.closest(".copy-password")
    if (!copyBtn) return

    const passwordWrapper = copyBtn.closest(".password-input")
    const passwordInput = passwordWrapper.querySelector("input")

    try {
        await navigator.clipboard.writeText(passwordInput.value)
        Toastify({
        text: "Password Copied",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
        }).showToast();

    } catch (err) {
        console.error("Copy failed", err)
    }
})

// add to fav list
deatilsContainer.addEventListener("click" , (e) => {
    const addToFavBtn = e.target.closest(".valut-fav-icon")
    if (!addToFavBtn) return
    let seclectedVault = localStorage.getItem("selectedVault")
    if (!seclectedVault) return
    saveFavoriteToLocalStorage(seclectedVault)
    renderAccountDeatils()
}) 
