import { Outlet, RouteObject, redirect } from 'react-router-dom';
import { authenticationService } from './services/authentication';
import { DiscoverPageContainer } from './components/discover-page/discover-page-container';
import { RestaurantsContainer } from './components/restaurants/restaurants-container';
import { LandingPage } from './components/landing-page/landing-page';

export function loader() {
    if (!authenticationService.getAuthStatus()) {
        return null;
    }

    return redirect('/il/tel-aviv');
}

export const routes: RouteObject[] = [
    {
        id: 'root',
        path: '/',
        element: <LandingPage />,
        loader,
    },
    {
        path: ':country/:city',
        element: <Outlet />,
        children: [
            {
                path: '',
                element: <DiscoverPageContainer />,
            },
            {
                path: 'restaurants',
                element: <RestaurantsContainer />,
            },
            {
                path: 'stores',
                element: <RestaurantsContainer />,
            },
        ],

        // children: [
        //     {
        //         index: true,
        //         path: 'restaurant/:id',
        //         element: <RestaurantContainer />,
        //     },
        //     {
        //         path: 'venue/:id',
        //         element: <div>VenueId</div>,
        //     },
        //     {
        //         path: 'category/:id',
        //         element: <div>CategoryId</div>,
        //     },
        // ],
    },
    {
        path: '*',
        element: <div>404</div>,
    },
];
