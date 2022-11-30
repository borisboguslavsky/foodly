import { menuActions } from "./menu-slice"
import { databaseUrl } from "../private-data"

export const fetchMenu = () => {
	return async (dispatch) => {
		const fetchMenuData = async () => {
			dispatch(menuActions.setLoading(true))
			const response = await fetch(`${databaseUrl}meals.json`)

			if (!response.ok) {
				throw new Error('Error fetching cart data')
			}

			const data = await response.json()
			return data	
		}

		try {
			const menuData = await fetchMenuData()
			dispatch(menuActions.replaceMenu({
				items: menuData || []
			}))
			dispatch(menuActions.setError(false))
		} catch(error) {
			dispatch(menuActions.setError(true))
			console.log(error)
		}
		dispatch(menuActions.setLoading(false))

	}
}