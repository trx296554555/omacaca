import { defineStore } from 'pinia'

interface ErrorPageState {
	isError: boolean
}
export const useCheckErrorPageStore = defineStore({
	id: 'app-error-page',
	state: (): ErrorPageState => ({
		isError: false,
	}),
})
