import { writable } from 'svelte/store'

export const navActiveStore = writable(false)
export const deleteActiveStore = writable(false)
export const deleteSelected = writable([])