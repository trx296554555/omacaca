import type { Router } from 'vue-router'
import { useCheckErrorPageStore } from '@/store/modules/isErrorPage'

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
	createCheckErrorGuard(router)
}

/**
 * Hooks for handling page state
 */
function createCheckErrorGuard(router: Router) {
	router.beforeEach(async (to) => {
		const isErrorStore = useCheckErrorPageStore()
		isErrorStore.isError = to.name === 'PageNotFound'
	})
}
