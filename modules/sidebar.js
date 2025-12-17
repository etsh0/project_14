import {favoriteList, openFavSidebar} from "./favorite-list.js"
import { accountsList } from './accounts-list.js';
import { deatilsContainer } from "./account-deatils.js";

const openSidebar = document.querySelector(".open-sidebar")
const closeSidebar = document.querySelector(".close-sidebar")
const sidebar = document.querySelector(".sidebar")
export const allItems = document.querySelector(".all-items")
export const favItems = document.querySelector(".favorite-items")
export const allItemsNumber = document.querySelector(".items-number")
export const favItemsNumber = document.querySelector(".fav-items-number")


openSidebar.addEventListener("click" , () => {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0')
})
openFavSidebar.addEventListener("click" , () => {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0')
})
closeSidebar.addEventListener("click" , () => {
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('translate-x-0');
})

allItems.addEventListener("click" , () => {
    favItems.classList.remove("active")
    allItems.classList.add("active")
    favoriteList.classList.add("hidden")
    accountsList.classList.remove("hidden")
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('translate-x-0');
    document.querySelectorAll(".vault-item").forEach(item => item.classList.remove("vault-active"))
    localStorage.removeItem("selectedVault")
    deatilsContainer.innerHTML = `
        <p class="text-center text-2xl text-gray-400 mt-[40%]">
            Select a vault to see details
        </p>
    `
})
favItems.addEventListener("click" , () => {
    allItems.classList.remove("active")
    favItems.classList.add("active")
    favoriteList.classList.remove("hidden")
    accountsList.classList.add("hidden")
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('translate-x-0');
    document.querySelectorAll(".vault-item").forEach(item => item.classList.remove("vault-active"))
    localStorage.removeItem("selectedVault")
    deatilsContainer.innerHTML = `
        <p class="text-center text-2xl text-gray-400 mt-[40%]">
            Select a favorite vault to see details
        </p>
    `
})

