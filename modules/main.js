import {} from "./sidebar.js"
import {passwordsForm} from "./accounts-list.js"

const addBtn = document.querySelector(".add-btn")
export const dialog = document.querySelector(".dialog")
export const dialogTitle = document.querySelector(".dialog-title")
const cancelModal = document.querySelector(".cancel-btn")
const closeModalIcon = document.querySelector(".dialog-close-icon")



addBtn.addEventListener("click" , () => {
    dialogTitle.textContent = "Create New Vault"
    passwordsForm.reset()
    dialog.showModal()
})
cancelModal.addEventListener("click" , () => {
    closeModal()
})
closeModalIcon.addEventListener("click" , () => {
    closeModal()
})

export function closeModal() {
    dialog.close()
}

