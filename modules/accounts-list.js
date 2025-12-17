import { renderAccountDeatils, deatilsSection, deatilsContainer } from "./account-deatils.js"
import { isMobile } from "./favorite-list.js"
import { closeModal, dialog, dialogTitle } from "../main.js"
import { getServiceIcon } from "./service-icon.js"
import { allItemsNumber } from "./sidebar.js"


export const passwordsForm = document.getElementById("passwords-form")
export const serviceNameInput = document.getElementById("serviceInput")
export const userNameInput = document.getElementById("userNameInput")
export const passwordInput = document.getElementById("passwordInput")
export const websiteInput = document.getElementById("websiteInput")
export const searchBar = document.querySelector(".search-input")
export const accountsList = document.querySelector(".accounts-list")
export const vaultsContainer = document.querySelector(".vaults-container") 
const showPasswordBtn = document.querySelector(".show-password")


export let passwords = []
let editingVaultId = null

export function savePasswordToLocalStorage() {

    const serviceName = serviceNameInput.value.trim()
    const userName = userNameInput.value.trim()
    const password = passwordInput.value.trim()
    const websiteName = websiteInput.value.trim()
    
    passwords = JSON.parse(localStorage.getItem('passwords')) || []

    if (editingVaultId) {
        passwords = passwords.map(pass => 
            pass.id == editingVaultId ? 
            {
                ...pass,
                service: serviceName,
                userName: userName,
                password: password,
                websiteURL: websiteName
            }
            : pass
        )
        editingVaultId = null
    }
    else {
        passwords.push({
            id: Date.now(),
            service: serviceName,
            userName: userName,
            password: password,
            websiteURL: websiteName
        })
    }
    localStorage.setItem('passwords', JSON.stringify(passwords))
}

export function getPasswords() {
    const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || []
    return savedPasswords
}
export function renderPasswords() {
    passwords = getPasswords()
    if (passwords.length === 0) {
        vaultsContainer.innerHTML = `
            <div class="empty-state text-gray-400 text-center mt-[50%]">
                <h2 class="text-2xl font-[600] mb-3">No Vaults Yet</h2>
                <p class="text-xl">Create your first vault to get started!</p>
            </div>
        `
        allItemsNumber.textContent = passwords.length
        return
    }

    vaultsContainer.innerHTML = ""
    vaultsContainer.innerHTML = passwords.map((password) => `
        <div data-id="${password.id}" class="vault-item rounded flex gap-4 cursor-pointer p-3">
            <div class="vault-icon px-3 py-3 rounded bg-[#2a2a2a] flex items-center justify-center text-white">
                ${getServiceIcon(password.service)}
            </div>
            <div class="flex justify-between gap-2 w-full">
                <div class="vault-content flex flex-col gap-1">
                    <div class="vault-title font-semibold">${password.service}</div>
                    <div class="vault-email text-sm lg:text-base text-[#D9D5D5] break-all">${password.userName}</div>
                </div>
                <div class="btns flex gap-5">
                    <button class="delete-btn" data-id="${password.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-trash text-[#9CA3AF]"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                    </button>
                    <button class="edit-btn" data-id="${password.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join("")
    allItemsNumber.textContent = passwords.length
}

// Event Delegation
vaultsContainer.addEventListener("click",(e) => {
    const vaultItem = e.target.closest(".vault-item")
    if(!vaultItem) return
    const id = vaultItem.dataset.id
    localStorage.setItem("selectedVault",id)
    document.querySelectorAll(".vault-item").forEach(item => {item.classList.remove("vault-active")})
    vaultItem.classList.add("vault-active")
    renderAccountDeatils()
})

function deleteAccount(id) {
    passwords = passwords.filter(item => item.id != id)
    localStorage.setItem("passwords", JSON.stringify(passwords))
    renderPasswords()
    localStorage.removeItem("selectedVault")
    renderAccountDeatils()
    Toastify({
    text: "Password deleted",
    duration: 2000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
    }).showToast();
}

vaultsContainer.addEventListener("click",(e) => {
    const deleteBtn = e.target.closest(".delete-btn")
    if(!deleteBtn) return
    const id = deleteBtn.dataset.id
    deleteAccount(id)
})


function editAccount(id) {
    const account = passwords.find( acc => acc.id == id)
    editingVaultId = id
    dialogTitle.textContent = "Edit Vault" 
    serviceNameInput.value = account.service
    userNameInput.value = account.userName
    passwordInput.value = account.password
    websiteInput.value = account.websiteURL
    dialog.showModal()
}

vaultsContainer.addEventListener("click",(e) => {
    const editBtn = e.target.closest(".edit-btn")
    if (!editBtn) return
    const id = editBtn.dataset.id
    editAccount(id)
})

passwordsForm.addEventListener("submit" , function(e) { 
    e.preventDefault() 
    savePasswordToLocalStorage()
    localStorage.removeItem("selectedVault")
    renderAccountDeatils()
    renderPasswords()
    passwordsForm.reset()
    closeModal()
})

searchBar.addEventListener("input",() => {
    const userSearched = searchBar.value.toLowerCase()
    const filteredPassword = passwords.filter(password =>
        password.service.toLowerCase().includes(userSearched)
    )
    filteredPassword.length === 0 ? vaultsContainer.innerHTML = `<h2 class="text-xl text-gray-400 text-center font-[600] mb-3">No Vaults Found</h2>` : vaultsContainer.innerHTML = filteredPassword.map((password) => `
        <div data-id="${password.id}" class="vault-item rounded flex gap-4 cursor-pointer p-3">
            <div class="vault-icon px-3 py-3 rounded bg-[#2a2a2a] flex items-center justify-center text-white">
                ${getServiceIcon(password.service)}
            </div>
            <div class="flex justify-between gap-2 w-full">
                <div class="vault-content flex flex-col gap-1">
                    <div class="vault-title font-semibold">${password.service}</div>
                    <div class="vault-email text-[#D9D5D5] break-all">${password.userName}</div>
                </div>
                <div class="btns flex gap-5">
                    <button class="delete-btn" data-id="${password.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-trash text-[#9CA3AF]"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                    </button>
                    <button class="delete-btn" data-id="${password.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join("")
})

showPasswordBtn.addEventListener("click" , () => {
    if (!showPasswordBtn) return 
    if (passwordInput.type === "password") {
        passwordInput.type = "text"
    }
    else {
        passwordInput.type = "password"
    }
})

vaultsContainer.addEventListener("click", (e) => {

    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) return;

    const editBtn = e.target.closest(".edit-btn")
    if (editBtn) return

    const vaultItem = e.target.closest(".vault-item");
    if (!vaultItem) return;

    localStorage.setItem("selectedVault", vaultItem.dataset.id);

    if (isMobile.matches) {
        accountsList.classList.add("hidden");
        deatilsSection.classList.remove("hidden");
    }
});

deatilsContainer.addEventListener("click", (e) => {
    const backBtn = e.target.closest(".back-btn");
    if (!backBtn) return;
    deatilsSection.classList.add("hidden");
    accountsList.classList.remove("hidden");
});
// load page
document.addEventListener("DOMContentLoaded", () => {
    renderPasswords();
    renderAccountDeatils()
});