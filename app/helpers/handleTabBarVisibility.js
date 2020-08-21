const getTabBarVisibility = (route) => {
	const routeName = route.state
		? route.state.routes[route.state.index].name
		: '';
	return routeName !== 'Preferences';
}

export default getTabBarVisibility;
